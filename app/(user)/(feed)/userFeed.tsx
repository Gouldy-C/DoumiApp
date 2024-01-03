import {Text, View, StyleSheet, Button, TextInput, FlatList, Pressable} from 'react-native';
import React, { useEffect } from 'react';
import { useUserFeedStore } from '@utils/stores/userStore';
import firestore from '@react-native-firebase/firestore';
import { FontAwesome } from "@expo/vector-icons"
import { FirestoreDocument } from '@utils/types/types';
import { handleLike, handlePost } from '@utils/posting/functions';


const UserFeed = () => {
  // Use custom stores to retrieve user information and user feed state
  const { inputValue, posts, setInputValue, setPosts } = useUserFeedStore()
  const orderedPostsRef = firestore().collection('Posts').orderBy('timestamp', "desc")


  // UPDATE THE POST POST STATE *******************************************
  // Set up an effect to subscribe to updates in the 'posts' collection
  useEffect(() => {
    // Subscribe to updates in the 'posts' collection
    const unsubscribe = orderedPostsRef.onSnapshot((querySnapshot) => {
    // Create an array to store updated posts
      const updatedPosts: FirestoreDocument[] = [];
    // Iterate through each document in the 'Posts' collection     
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ 
          content: doc.get('content'),
          uid: doc.get('uid'),
          timestamp: doc.get('timestamp'),
          displayName:doc.get('displayName'),
          post_id: doc.get('post_id'),
          likedPost:doc.get('likedPost')
        } as FirestoreDocument);
      });

      // Update the state with the new posts
      setPosts(updatedPosts);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // Only run this effect once on mount
  

  const handleInputChange = (text:string) => {
    setInputValue(text);
  };


  // submit A POST ******************************************************
  const submitPost = async () => {
    handlePost(inputValue)
    setInputValue('')
  };


  // FORM ***************************************************************
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>Your Feed</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Type something...'
            onChangeText={handleInputChange}
            value={inputValue}
          />
        </View>
        <View style={styles.button}>
          <Button title="Post" onPress={submitPost} />
        </View>
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View>
                <Text>{item.content}</Text>
                <Text>{item.displayName}</Text>
                <Pressable onPress={()=>handleLike(item.post_id)}><FontAwesome name="heart" size={20} color="red" /></Pressable>
                <Text>{item.likedPost.length}</Text>
              </View>
            )}
          />
        </View>
      </View>
  )
}

export default UserFeed

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "80%",
    height: "30%",
    alignSelf: "center",
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 1,
  },
  input: {
    backgroundColor: 'white',
    height: '100%'
  },
  button: {
    marginTop: 10
  },
  postsContainer: {
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: "90%"
  }
})