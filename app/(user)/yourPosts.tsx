import {Text, View, StyleSheet, Modal, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import { userStore, useUserFeedStore } from '@utils/stores/userStore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { FirestoreDocument } from '@utils/types/types';


const yourPosts = () => {
  const {posts, setPosts } = useUserFeedStore();
  const currentUser =  auth().currentUser;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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
    setSelectedPost(null);
    setModalVisible(false);
  }

  // DELETE POST*************************************

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
                    <Text>{selectedPost?.content}</Text>
                    <Pressable onPress={closeModal}>
                      <Text>Delete Post</Text>
                    </Pressable>
                    <Pressable onPress={closeModal}>
                      <Text>Close Modal</Text>
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