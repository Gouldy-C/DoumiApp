import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirestorePost } from '@utils/types/types'
import LikeAPost from '@components/LikeAPost';
import { constStyles } from '@constants/Styles';
import CommentPost from './CommentPost';

const Posts = ({postsRef, openModal}:{
  postsRef : FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>,
  openModal?: (post: FirestorePost) => void
}) => {
  const [ posts, setPosts ]= useState<FirestorePost[] | null>(null)

  useEffect(() => {
    const subscriber = postsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot){ 
        const updatedPosts: FirestorePost[] = []
        querySnapshot.forEach((doc) => {
          updatedPosts.push({ 
            content: doc.get('content'),
            uid: doc.get('uid'),
            timestamp: doc.get('timestamp'),
            displayName:doc.get('displayName'),
            post_id: doc.get('post_id'),
            likedPost: doc.get('likedPost')
          } as FirestorePost);
        });
      setPosts(updatedPosts);
    }
    });
    return subscriber // On unmount end listener
  }, [])


  return (
    <ScrollView>
      {posts?.sort((a,b) => b.timestamp?.seconds - a.timestamp?.seconds).map((post) => (
        <View key={post.post_id} style={styles.postsContainer}>
          <Text>{post.displayName}</Text>
          <Text style={constStyles.postText}>{post.content}</Text>
          <View style={{ flexDirection:'row', gap: 15, alignItems: 'center', }}>
            <LikeAPost  post={post}/>
            <CommentPost/>
            {openModal &&
              <Pressable style={{alignItems: 'center'}} onPress={() => openModal(post)}>
                <Text style={{color: 'red', borderColor: 'red', fontSize: 18, textAlignVertical: 'center', textAlign:'center', borderRadius: 20, borderWidth: 2, paddingHorizontal: 15, paddingVertical: 0.3}}>
                  Delete
                </Text>
              </Pressable>
            }
          </View>
        </View>

      ))}
    </ScrollView>
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