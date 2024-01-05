import {Text, View, StyleSheet, FlatList, Pressable} from 'react-native';
import React, { useEffect } from 'react';
import { useUserFeedStore } from '@utils/stores/userStore';
import firestore from '@react-native-firebase/firestore';
import { FontAwesome } from "@expo/vector-icons"
import { FirestoreDocument } from '@utils/types/types';
import { handleLike } from '@utils/posting/functions';
import auth from '@react-native-firebase/auth'


const userId = auth().currentUser?.uid

const UserFeed = () => {
  // Use custom stores to retrieve user information and user feed state
  const { posts, setPosts } = useUserFeedStore()
  const usersPostsRef = firestore().collection('Posts').where("uid", "==", userId)

  // UPDATE THE POST POST STATE *******************************************
  // Set up an effect to subscribe to updates in the 'posts' collection
  useEffect(() => {
    // Subscribe to updates in the 'posts' collection
    const unsubscribe = usersPostsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot === null){
        return
      }
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
  }, [])
  
  useEffect(() => {

  }, [posts])
  

  // FORM ***************************************************************
  return (
    <View style={styles.postsContainer}>
      {posts !== null ?
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
      :
      <Text>You have no Liked Posts</Text>
      }
    </View>
  )
}

export default UserFeed

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
  }
})