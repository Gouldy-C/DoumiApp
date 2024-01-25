import React from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import BackArrowSvg from './svg-components/backArrowSvg';
import BookmarkPost from './BookmarkedPosts';
import { constStyles } from '@constants/Styles';
import LikeAPost from '@components/LikeAPost';
import CommentPost from './CommentButton';
import { userStore } from '@utils/stores/userStore';
import LikeAComment from './LikeAComment';
import { FirestorePost } from '@utils/types/types';
import { FirestoreComment } from '@utils/types/types';

interface CommentBoxProps {
  post_id: string | null;
  posts: FirestorePost[] | null;
  postsRef: FirestorePost
  commentsRef: FirestoreComment;
  comments: FirestoreComment[] | null;
  setOpenCommentModal: (open: boolean) => void;
  fetchComments: (post_id: string) => void;
  setSelectedPostId: (post_id: string | null) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ post_id, posts, comments, setOpenCommentModal, fetchComments, setSelectedPostId, commentsRef }) => {
  const filteredComments = comments?.filter(comment => comment.post_id === post_id) || [];
  const commentedPost = posts?.find(p => p.post_id === post_id);
  const {user} = userStore((state) => state);

  if (!commentedPost) {
    return null;
  }

  return (
    <FlatList
      data={[commentedPost, ...filteredComments]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View key={index} style={index === 0 ? styles.postsContainer : styles.commentContainer}>
          {index === 0 ? (
            <>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', gap: 12, paddingLeft: 16 }}>
                  <Pressable onPress={() => setOpenCommentModal(false)} style={{ width: 24, marginRight: 20 }}>
                    <BackArrowSvg height={24} width={20} color={'#424052'} scale={1.2} />
                  </Pressable>
                    <Image
                      source={{ uri: commentedPost.photoURL }}
                      style={{ height: 35, aspectRatio: 1, borderRadius: 50 }}
                    />
                  <View>
                    <Text style={{ fontSize: 19, fontWeight: '500' }}>{commentedPost.displayName}</Text>
                    <Text>{commentedPost.timestamp?.seconds && commentedPost.timestamp.toDate().toLocaleString()}</Text>
                  </View>
                </View>
                <BookmarkPost post_id={commentedPost.post_id} />
              </View>
              <Text style={{ fontSize: constStyles.postText.fontSize, marginBottom: 8, paddingHorizontal: 10 }}>
                {commentedPost.content}
              </Text>
              <View style={styles.labels}>
                <LikeAPost post={commentedPost} />
                <CommentPost
                  post={commentedPost}
                  comments={comments ?? []}
                  onPress={(post_id) => {
                    setSelectedPostId(post_id);
                    fetchComments(post_id);
                  }}
                />
              </View>
            </>
          ) : (
            <>
              <View style={{ flex: 1, flexDirection: 'row', gap: 15, alignItems: 'center', paddingHorizontal: 12 }}>
                  <Image
                    source={item && item.photoURL ? { uri: item.photoURL } : require('../assets/images/favicon.png')}
                    style={{ height: 35, aspectRatio: 1, borderRadius: 50 }}
                  />
                <View>
                  <Text style={{ fontSize: 17, fontWeight: '500' }}>{item.displayName}</Text>
                  <Text>{item.timestamp.seconds && item.timestamp.toDate().toLocaleString()}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'top', paddingRight: 20 }}>
                  <LikeAComment commentStore={commentsRef} postStore={commentedPost} />
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 17, width: "70%", marginLeft: 61 }}>{item.comment}</Text>
              </View>
            </>
          )}
        </View>
      )}
    />
  );
};

export default CommentBox;


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