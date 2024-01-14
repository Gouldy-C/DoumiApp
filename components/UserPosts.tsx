import {Text, 
  View, 
  StyleSheet, 
  Pressable, 
  Modal, 
  SafeAreaView,
  ScrollView} from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { deletePost} from '@utils/posting/functions';
import auth from '@react-native-firebase/auth'
import Posts from '@components/Posts';
import { FirestorePost } from '@utils/types/types';
import { LinearGradient } from 'expo-linear-gradient';



const UserPosts = () => {
  // Use custom stores to retrieve user information and user feed state
  const userId = auth().currentUser?.uid
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FirestorePost | null>(null);
  const usersPostsRef = firestore().collection('Posts').where("uid", "==", userId)

  
  const openModal = (post : FirestorePost) => {
    setModalVisible(true);
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalVisible(false);
  }


  const confirmDelete = async () => {
    if (selectedPost ){
      deletePost(selectedPost);
      closeModal();
    }
  };


  return (
    <LinearGradient
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0.0 }}
        colors={['rgba(115, 69, 149, 0.2)', 'rgba(72, 104, 167, 0.2)']}
        style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Posts postsRef={usersPostsRef} openDeleteModal={openModal}/>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=> setModalVisible(false)}
      >
        <Pressable
          style={styles.outsideContainer}
          onPress={() => setModalVisible(false)} // Close modal when overlay is pressed
        />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Are you sure you want to delete this post?</Text>
            <Text style={{textAlign: 'center'}}>{selectedPost?.content || 'No content available'}</Text>
            <View style={{flexDirection:'row', justifyContent: 'space-evenly', marginVertical: 20}}>
              <Pressable onPress={() => confirmDelete()}>
                <Text style={[styles.button, {borderColor: 'red'}]}>Delete Post</Text>
              </Pressable>
              <Pressable onPress={closeModal}>
                <Text style={[styles.button, {borderColor: 'black'}]}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  )
}

export default UserPosts

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 3,
  },
  postsContainer: {
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
  },
  posts: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    elevation: 10,
  },
  outsideContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  safeView: {
    flex: 1,
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