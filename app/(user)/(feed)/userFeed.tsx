import {Text, View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FirestoreDocument } from '@utils/types/types';
import LikeAPost from '@components/LikeAPost';



const UserFeed = () => {
  // Use custom stores to retrieve user information and user feed state
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
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>Your Feed</Text>
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View key={item.post_id}>
                <Text>{item.content}</Text>
                <Text>{item.displayName}</Text>
                <LikeAPost post_id={item.post_id} likedPost={item.likedPost}/>
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
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: "90%"
  }
})