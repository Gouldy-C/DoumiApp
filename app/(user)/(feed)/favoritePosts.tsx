import {Text, View, StyleSheet, FlatList, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FontAwesome } from "@expo/vector-icons"
import { FirestoreDocument } from '@utils/types/types';
import { handleLike } from '@utils/posting/functions';
import auth from '@react-native-firebase/auth'


const userId = auth().currentUser?.uid

const UserFeed = () => {
  // Use custom stores to retrieve user information and user feed state
  const [ posts, setPosts ]= useState<FirestoreDocument[] | null>(null)
  const favPostsRef = firestore().collection('Posts').where("likedPost", "array-contains", userId)

  // UPDATE THE POST POST STATE *******************************************
  // Set up an effect to subscribe to updates in the 'posts' collection
  useEffect(() => {
    // Subscribe to updates in the 'posts' collection
    const unsubscribe =  favPostsRef.onSnapshot((querySnapshot) => {
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
        console.log("liked post page");
        // Update the state with the new posts
        setPosts(updatedPosts);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // Only run this effect once on mount
  
  

  // FORM ***************************************************************
  return (
    <View style={styles.postsContainer}>
      {posts !== null ?
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View key={item.post_id}>
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