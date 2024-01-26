import {
  View, 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { deletePost} from '@utils/posting/functions';
import auth from '@react-native-firebase/auth'
import Posts from '@components/Posts';
import { FirestorePost } from '@utils/types/types';
import { LinearGradient } from 'expo-linear-gradient';
import AreYouSureModal from './AreYouSureModal';


const UserPosts = () => {
  const userId = auth().currentUser?.uid
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReturn, setModalReturn] = useState(false)
  const [selectedPost, setSelectedPost] = useState<FirestorePost | null>(null);
  const usersPostsRef = firestore().collection('Posts').where("uid", "==", userId)
  const question = "Are you sure you want to delete this post?"

  
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
        <Posts postsRef={usersPostsRef} openDeleteModal={openModal} showBookmarkPost={false}/>
      </View>


      <AreYouSureModal header={question} state={modalVisible} setModalVisible={setModalVisible} setModalReturn={setModalReturn}/>

    </LinearGradient>
  )
}

export default UserPosts