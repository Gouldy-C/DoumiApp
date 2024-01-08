import {Text, View, StyleSheet, Button, TextInput, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FontAwesome } from "@expo/vector-icons"
import { FirestoreDocument } from '@utils/types/types';
import { handleLike } from '@utils/posting/functions';
import auth from '@react-native-firebase/auth'
import UnlikedHeart from '@components/svg-components/unlikedHeart';
import LikedHeart from '@components/svg-components/likedHeart';
import LikeAPost from '@components/LikeAPost';
import commentPost from '@components/svg-components/commentPost';
import { constStyles } from '@constants/Styles';

const Posts = () => {
    // Use custom stores to retrieve user information and user feed state
    const userId = auth().currentUser?.uid
    const [ posts, setPosts ]= useState<FirestoreDocument[] | null>(null)
    const orderedPostsRef = firestore().collection('Posts').orderBy('timestamp', "desc")
  
  
    // UPDATE THE POST POST STATE *******************************************
    // Set up an effect to subscribe to updates in the 'posts' collection
    useEffect(() => {
      // Subscribe to updates in the 'posts' collection
      const unsubscribe = orderedPostsRef.onSnapshot((querySnapshot) => {
      // Create an array to store updated posts
        if (querySnapshot !== null){ 
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
      }
      });
  
      // Unsubscribe when the component unmounts
      return () => unsubscribe();
    }, [])
  
    // FORM ***************************************************************
    return (
      <>
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <View key={item.post_id} style={styles.postsContainer}>
                    <Text>{item.displayName}</Text>
                    <Text style={constStyles.postText}>{item.content}</Text>
                    <View style={{ flexDirection:'row', gap: 10}}>
                      <View style={constStyles.labels}>
                        <LikeAPost post_id={item.post_id} likedPost={item.likedPost}/>
                        <Text>{item.likedPost.length}</Text>
                      </View>
                      <View style={constStyles.labels}>
                        <Text>1</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
      </>
    )
  }

  export default Posts

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  input: {
    backgroundColor: 'white',
    height: '100%'
  },
  button: {
    marginTop: 10
  },
  postsContainer: {
    marginTop: 10,
    borderColor: 'black',
    width: "90%",
    marginLeft: 10,
    marginBottom: 10
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignItems: 'center',
  }
})