import { FirestorePost, FirestoreComment } from '@utils/types/types'
import {Text, 
  View, 
  StyleSheet,
  Image, 
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import LikeAPost from '@components/LikeAPost';
import { constStyles } from '@constants/Styles';
import CommentPost from './CommentPost';
import { userStore } from '@utils/stores/userStore';
import EllipsisMenu from './svg-components/ellipsisMenu';
import { BlurView } from 'expo-blur';
import NewComment from './NewComment';


const Posts = ({postsRef, openDeleteModal}:{
  postsRef : FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData> | FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>,
  openDeleteModal?: (post: FirestorePost) => void
}) => {
    const [ posts, setPosts ]= useState<FirestorePost[] | null>(null);
    const [comments, setComments] = useState<FirestoreComment[] | null>(null);
    const [ openCommentModal, setOpenCommentModal ] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const {user} = userStore((state) => state);

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
    }, []);


    const fetchComments = async (post_id: string) => {
      try {
        const commentsSnapshot = await postsRef
          .doc(post_id)
          .collection('comments')
          .get();
    
        const updatedComments: FirestoreComment[] = [];
        commentsSnapshot.forEach((commentDoc: any) => {
          updatedComments.push({
            comment: commentDoc.get('comment'),
            post_id: post_id,
          } as FirestoreComment);
        });
        setComments(updatedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    


    const Comments = ({ post_id }: { post_id: string | null }) => {
      const filteredComments = comments?.filter(comment => comment.post_id === post_id) || [];

      return (
        <FlatList
        data={filteredComments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.commentContainer}>
            <Text style={{fontSize: 20}}>{item.comment}</Text>
            <Text style={{fontSize: 20}}>{item.displayName}</Text>
          </View>
        )}
      />
    );
  };
  
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
                    <CommentPost 
                      post={post}
                      comments={comments ?? []}
                      onPress={(post_id)=>{
                      setSelectedPostId(post_id);
                      setOpenCommentModal(true);
                      fetchComments(post_id);
                      console.log('Clicked post_id', post_id)
                      }}/>
                </View>
              </View>


              <View style={{position: 'absolute', top: 0, right: 15}}>
                {openDeleteModal && (
                  <Pressable style={{paddingHorizontal: 18, paddingVertical:15,}} onPress={() => openDeleteModal(post)}>
                    <EllipsisMenu scale={0.90} height={30} width={20}/>
                  </Pressable>
                )}
              </View>
              

{/* COMMENTS MODAL START */}
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
                    <View style={{flex: 1}}>
                      <Comments post_id={selectedPostId}/>
                    </View>
                    <View style={{flex:1}}>
                      <NewComment post_id={selectedPostId!}/>
                    </View>
                  </View>
              </Modal>
{/* COMMENTS MODAL END */}


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
  },
  commentContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    marginVertical: 8
  }
})