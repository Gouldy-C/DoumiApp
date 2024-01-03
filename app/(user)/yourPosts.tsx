import {Text, View, StyleSheet, Modal, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import { userStore, useUserFeedStore } from '@utils/stores/userStore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { FirestoreDocument } from '@utils/types/types';


const yourPosts = () => {
  const currentUser =  auth().currentUser;
  const {posts, setPosts, deletePost } = useUserFeedStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  // QUERY ONLY THE POSTS FROM THE CURRENT USER*******************
  useFocusEffect(
    React.useCallback(() => {
      if (currentUser?.uid) {
        const postsRef = firestore().collection('Posts').where('uid', '==', currentUser.uid);
        const orderedPostsRef = postsRef.orderBy('timestamp');
  
        const unsubscribe = orderedPostsRef.onSnapshot((querySnapshot) => {
          const updatedPosts: FirestoreDocument[] = [];
          querySnapshot.forEach((doc) => {
            updatedPosts.push({
              content: doc.get('content'),
              uid: doc.get('uid'),
              timestamp: doc.get('timestamp'),
              post_id: doc.get('post_id')
            } as FirestoreDocument);
          });
  
          setPosts(updatedPosts);
        }, (error) => console.log(error));
  
        return () => unsubscribe();
      }
    }, [currentUser?.uid, setPosts])
  );


  // OPEN MODAL WITH CLICKED POST*******************
  const openModal = (post_id:string, content?:string) => {
    setModalVisible(true);
    setSelectedPost({ post_id, content});
  };

  const closeModal = () => {
    setSelectedPost({});
    setModalVisible(false);
  }

  // DELETE POST*************************************
  const confirmDelete = async () => {
    const { post_id } = selectedPost;

    try {
      // Delete the document with the specified post_id
      await firestore().collection('Posts').where('post_id', '==', post_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
      console.log('Document successfully deleted!');

      // Use the store function to delete the post from the local state
      deletePost(post_id);
    } catch (error) {
      console.error('Error deleting document:', error);
    }

    // Close the modal after deleting
    closeModal();
  };


  return (
        <View style={styles.safeView}>
            <FlatList
              style={styles.list}
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.posts}>
                  <Text>{item.content}</Text>
                  <Pressable onPress={()=> openModal(item.post_id, item.content)}>
                    <Text>Delete</Text>
                  </Pressable>
                </View>
              )}
            />

              <Modal
                animationType='none'
                transparent={false}
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
                    <Pressable onPress={confirmDelete}>
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

export default yourPosts

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
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