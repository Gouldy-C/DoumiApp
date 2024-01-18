import { FirestorePost } from '@utils/types/types'
import {Text, 
  View, 
  StyleSheet,
  Image, 
  Pressable,
  Modal,
  TextInput,
  ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import LikeAPost from '@components/LikeAPost';
import { constStyles } from '@constants/Styles';
import CommentPost from './CommentPost';
import { userStore } from '@utils/stores/userStore';
import EllipsisMenu from './svg-components/ellipsisMenu';
import { BlurView } from 'expo-blur';


const Posts = ({postsRef, openDeleteModal}:{
  postsRef : FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>,
  openDeleteModal?: (post: FirestorePost) => void
}) => {
    const [ posts, setPosts ]= useState<FirestorePost[] | null>(null)
    const [ openCommentModal, setOpenCommentModal ] = useState(false)
    const {user} = userStore((state) => state)

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

  
    // FORM ***************************************************************
    return (
      <>
        <ScrollView>
          {posts?.sort((a,b) => b.timestamp?.seconds - a.timestamp?.seconds).map((post) => (
            <View key={post.post_id} style={{flexDirection: 'row', justifyContent:'space-around', position: 'relative'}}>
              <View key={post.post_id} style={styles.postsContainer}>
                <View style={styles.labels}>
                {user?.photoURL && post.uid === user.uid && (
                  <Image
                    source={{ uri: user.photoURL }}
                    style={{ height: 35, aspectRatio: 1, borderRadius: 50 }}
                      />
                    )}
                  <Text style={styles.name}>{post.displayName}</Text>
                </View>
                <Text>{post.timestamp?.seconds && post.timestamp.toDate().toLocaleString()}</Text>
                <Text style={constStyles.postText}>{post.content}</Text>
                <View style={styles.labels}>
                    <LikeAPost post={post}/>
                    <CommentPost onPress={()=>setOpenCommentModal(true)}  />
                </View>
              </View>


              <View style={{position: 'absolute', top: 0, right: 15}}>
                {openDeleteModal && (
                  <Pressable style={{paddingHorizontal: 18, paddingVertical:15,}} onPress={() => openDeleteModal(post)}>
                    <EllipsisMenu scale={0.90} height={30} width={20}/>
                  </Pressable>
                )}
              </View>
              

              <Modal
                  animationType='slide'
                  transparent={true}
                  visible={openCommentModal}
              >
                  <View style={{flex:1, backgroundColor:'white'}}>                      
                    <Text>Comments</Text>
                    <Pressable onPress={()=>setOpenCommentModal(false)}>                        
                      <Text>Close</Text>
                    </Pressable>
                    <TextInput
                      placeholder='Write a Comment...'
                      style={{borderColor: 'black', borderWidth: 1, height: '20%'}}
                    />
                    <Pressable onPress={()=> console.log('hi')}><Text>Publish</Text></Pressable>
                  </View>
              </Modal>
            </View>
          ))}
        </ScrollView>
      </>
    )
  }

  export default Posts

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignposts: "center",
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
    marginTop: 5,
    width: "100%",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 15,
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignposts: 'center',
  },
  labels: {
    flexDirection:'row', 
    gap: 15,
    alignposts: 'center'
  }, 
  name: {
    fontSize: 19
  }
})