import {
  View, 
} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { LinearGradient } from 'expo-linear-gradient'
import PostListView from './PostListView';
import { searchStore } from '@utils/stores/searchStore';
import { searchableHashtags } from '@constants/hashtagSearch/hashtagData';


const UserPosts = () => {
  const userId = auth().currentUser?.uid
  const search = searchStore((state) => state.search)
  const usersPostsRef = firestore().collection('Posts')
  .where("uid", "==", userId)
  .where("hashTags", "array-contains-any", search.length ? search : searchableHashtags)
  .orderBy("timestamp", "desc")


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