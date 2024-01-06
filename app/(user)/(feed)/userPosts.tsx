import {Text, View, StyleSheet, FlatList, Pressable, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FirestoreDocument } from '@utils/types/types';
import { deletePost } from '@utils/posting/functions';
import auth from '@react-native-firebase/auth'
import { FontAwesome } from '@expo/vector-icons';


interface SelectedPost {
  content?: string,
  post_id: string,
}

const UserFeed = () => {
  // Use custom stores to retrieve user information and user feed state
  const userId = auth().currentUser?.uid
  const [ posts, setPosts ]= useState<FirestoreDocument[] | null>(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SelectedPost | null>(null);
  const usersPostsRef = firestore().collection('Posts').where("uid", "==", userId)


  // UPDATE THE POST POST STATE *******************************************
  // Set up an effect to subscribe to updates in the 'posts' collection
  useEffect(() => {
    // Subscribe to updates in the 'posts' collection
    const unsubscribe = usersPostsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot === null){
        return
      }
    // Create an array to store updated posts
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
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [])
  
  // OPEN MODAL WITH CLICKED POST*******************
  const openModal = (post_id: string, content?:string) => {
    setModalVisible(true);
    setSelectedPost({ post_id, content});
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalVisible(false);
  }

  // DELETE POST*************************************
  const confirmDelete = async () => {
    if (selectedPost ){
      const { post_id } = selectedPost;
      deletePost(post_id);
      closeModal();
    }
  };

  

  // FORM ***************************************************************
  return (
    <View style={styles.postsContainer}>
      {posts !== null ?
        <FlatList
          style={styles.list}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.posts}>
              <View key={item.post_id}>
                <Text>{item.content}</Text>
                <Text>{item.displayName}</Text>
                <FontAwesome name="heart" size={20} color="red" />
                <Text>{item.likedPost.length}</Text>
              </View>
              <Pressable onPress={()=> openModal(item.post_id, item.content)}>
                <Text>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      :
      <Text>You have no Liked Posts</Text>
      }
      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=> setModalVisible(false)}
      >
      <Pressable
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)} // Close modal when overlay is pressed
      ></Pressable>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{selectedPost?.content || 'No content available'}</Text>
            <Pressable onPress={() => confirmDelete()}>
              <Text>Click here to confirm delete</Text>
            </Pressable>
            <Pressable onPress={closeModal}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  },
  posts: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  list: {
    width: '100%'
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
    height: '60%', 
    elevation: 5,
  },
})