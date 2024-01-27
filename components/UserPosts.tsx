import {
  View, 
} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { LinearGradient } from 'expo-linear-gradient'
import PostListView from './PostListView';


const UserPosts = () => {
  const userId = auth().currentUser?.uid
  const usersPostsRef = firestore().collection('Posts').where("uid", "==", userId)


  return (
    <LinearGradient
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0.0 }}
        colors={['rgba(115, 69, 149, 0.2)', 'rgba(72, 104, 167, 0.2)']}
        style={{ flex: 1 }}
    >
      <View style={{
        width: "100%",
        height: "100%",
        alignSelf: "center",
        }}>
        <PostListView
          postsRef={usersPostsRef}/>
      </View>
    </LinearGradient>
  )
}

export default UserPosts