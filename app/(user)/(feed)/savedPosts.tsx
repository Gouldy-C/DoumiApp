import {View, 
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Posts from '@components/Posts';
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import AreYouSureModal from '@components/AreYouSureModal';
import { FirestorePost } from '@utils/types/types';
import { deletePost } from '@utils/posting/functions';
import PostListView from '@components/PostListView';
import { fetchComments } from '@utils/commenting/functions';
import { FirestoreComment } from '@utils/types/types';
import auth from '@react-native-firebase/auth';


const UserFeed = () => {
  const userId = auth().currentUser?.uid
  const postsRef = firestore().collection('Posts').where("bookmarkedPosts", "array-contains", userId)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReturn, setModalReturn] = useState(false)
  const [selectedPost, setSelectedPost] = useState<FirestorePost | null>(null);
  const [posts, setPosts] = useState<FirestorePost[]>([]);
  const [comments, setComments] = useState<FirestoreComment[]>([]);
  const question = "Are you sure you want to delete this post?"


  // FETCH POSTS 
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
            likedPost: doc.get('likedPost'),
            photoURL: doc.get('photoURL'),
            bookmarkedPosts: doc.get('bookmarkedPosts')
          } as FirestorePost);
        });
      setPosts(updatedPosts);
    }
    });
    return subscriber // On unmount end listener
  }, []);


  // SETS COMMENTS TO THE SELECTED POST
  useEffect(()=> {
    selectedPost && fetchAndUpdateComments(selectedPost.post_id)
  }, [selectedPost]) 

// UPDATES WITH FETCHED COMMENT AFTER FETCHING
  const fetchAndUpdateComments = (post_id:string) => {
    fetchComments(post_id, setComments)
  }

  // OPEN MODAL FOR DELETION
  const openModal = (post : FirestorePost) => {
    setModalVisible(true);
    setSelectedPost(post);
  };

  useEffect(() => {
    if (modalReturn && selectedPost) {
      deletePost(selectedPost)
      setModalReturn(false)
    }
  }, [modalVisible])

  console.log(posts)

  return (

    <LinearGradient
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0.0 }}
      colors={['rgba(80, 73, 164, 0.2)', 'rgba(56, 85, 146, 0.2)']}
      style={{ flex: 1 }}
    >

      <View style={styles.container}>
        <PostListView 
          posts={posts} 
          showBookmarkPost={true} 
          onOptionsPress={openModal} 
          comments={comments} 
          fetchComments={fetchAndUpdateComments} 
          onCommentPress={(post)=>setSelectedPost(post)} />
      </View>

      <AreYouSureModal header={question} state={modalVisible} setModalVisible={setModalVisible} setModalReturn={setModalReturn}/>
    </LinearGradient>

  )
}

export default UserFeed

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignItems: 'center',
  }
})