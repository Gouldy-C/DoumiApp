import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import Posts from '@components/Posts';
import { LinearGradient } from 'expo-linear-gradient';
import { userStore } from '@utils/stores/userStore'

const SavedPosts = () => {
  // Use custom stores to retrieve user information and user feed state
  const userId = auth().currentUser?.uid
  const favPostsRef = firestore().collection('Posts').where("likedPost", "array-contains", userId)
  const savedPostsRef = firestore().collection('Users').doc(userId)

  const fieldToRetrieve = 'bookmarkedPosts';

const fetchSavedPosts = async () => {
  try {
    const snapshot = await savedPostsRef.get();

    // Check if the document exists
    if (snapshot.exists) {
      const userData = snapshot.data();

      // Check if the field exists in the document
      if (userData && userData[fieldToRetrieve] !== undefined) {
        const specificFieldValue = userData[fieldToRetrieve];
        console.log(`Specific Field Value:`, specificFieldValue);
        console.log('Liked posts:', favPostsRef)
      } else {
        console.log(`Field "${fieldToRetrieve}" does not exist in the document`);
      }
    } else {
      console.log(`Document does not exist`);
    }
  } catch (error) {
    console.error('Error fetching saved posts:', error);
  }
};

// Call the function to fetch and log the specific field value
fetchSavedPosts();
  
  return (
    <LinearGradient
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0.0 }}
        colors={['rgba(115, 69, 149, 0.2)', 'rgba(72, 104, 167, 0.2)']}
        style={{ flex: 1 }}
    >

      <View style={styles.container}>
        <Posts postsRef={favPostsRef}/>
      </View>
    </LinearGradient>
  )
}

export default SavedPosts

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
  },
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignItems: 'center',
  }
})