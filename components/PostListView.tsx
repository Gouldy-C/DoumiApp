import { FirestorePost, FirestoreComment } from '@utils/types/types'
import {Text, 
  View, 
  StyleSheet,
  Image, 
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import LikeAPost from '@components/LikeAPost';
import { constStyles } from '@constants/Styles';
import CommentPost from './CommentButton';
import { userStore } from '@utils/stores/userStore';
import EllipsisMenu from './svg-components/ellipsisMenu';
import NewComment from './NewComment';
import { LinearGradient } from 'expo-linear-gradient';
import BookmarkPost from './BookmarkedPosts';
import CommentBox from './CommentBox';
import auth from '@react-native-firebase/auth';


const PostListView = ({posts, comments=[], onOptionsPress, showBookmarkPost = true, fetchComments, onCommentPress}:{
  posts: FirestorePost[]
  comments?: FirestoreComment []
  onOptionsPress?: (post: FirestorePost) => void
  showBookmarkPost?: boolean
  fetchComments: (post_id: string) => void
  onCommentPress?: (post: FirestorePost) => void
}) => {
    const [ openCommentModal, setOpenCommentModal ] = useState(false);
    const [ selectedPostId, setSelectedPostId ] = useState<string>("");
    const {user} = userStore((state) => state);
    const userId= auth().currentUser?.uid;
    

    // FORM ***************************************************************
    return (
      <>
        <ScrollView>
          {posts?.sort((a,b) => b.timestamp?.seconds - a.timestamp?.seconds).map((post) => (
            <View key={post.post_id} style={styles.postsContainer}>

              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                <View key={post.post_id} style={{flex: 1, flexDirection: "row", alignItems: 'center', gap: 10}}>

                    <Image
                      source={{ uri: post.photoURL }}
                      style={{ height: 35, aspectRatio: 1, borderRadius: 50 }}
                    />

                  <View> 
                      <Text style={styles.name}>{post.displayName}</Text>
                      <Text>{post.timestamp?.seconds && post.timestamp.toDate().toLocaleString()}</Text>
                  </View>
                </View>

                {userId !== post.uid && showBookmarkPost && <BookmarkPost post={post}/>}
              </View>



              <View>
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
                      onCommentPress && onCommentPress(post)
                      }}/>
                </View>
              </View>

            {onOptionsPress && (
              <View style={{position: 'absolute', top: 0, right: 15}}>
                {userId == post.uid && (
                  <Pressable style={{paddingHorizontal: 18, paddingVertical:15,}} onPress={() => onOptionsPress(post)}>
                    <EllipsisMenu scale={0.90} height={30} width={20}/>
                  </Pressable>
                )}
              </View>
              )}
              

{/* COMMENTS MODAL START */}

<Modal
  animationType='slide'
  visible={openCommentModal}
>
    <LinearGradient
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0.0 }}
      colors={['rgba(115, 69, 149, 0.2)', 'rgba(72, 104, 167, 0.2)']}
      style={{ flex: 1 }}
    >
      <View  style={{
flex: 1, justifyContent: 'flex-end'
          }}>
          
        <CommentBox
          post_id={selectedPostId}
          user={user}
          posts={posts}
          comments={comments}
          setOpenCommentModal={setOpenCommentModal}
          fetchComments={fetchComments}
          setSelectedPostId={setSelectedPostId}
        />
          <NewComment post_id={selectedPostId!} onSubmit={()=>fetchComments(selectedPostId)} />

    </View>
    </LinearGradient>
</Modal>

{/* COMMENTS MODAL END */}

            </View>
          ))}
        </ScrollView>
      </>
    )
  }

  export default PostListView

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
    marginVertical: 3,
    width: "100%",
    paddingLeft: 10,
    paddingBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 12,
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
    width: "100%",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: 'white',
    gap: 8,
  }
})