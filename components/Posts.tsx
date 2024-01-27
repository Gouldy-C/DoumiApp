import { FirestorePost, FirestoreComment } from "@utils/types/types";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import LikeAPost from "@components/LikeAThing";
import { constStyles } from "@constants/Styles";
import CommentPost from "./CommentButton";
import { userStore } from "@utils/stores/userStore";
import EllipsisMenu from "./svg-components/ellipsisMenu";
import NewComment from "./NewComment";
import { LinearGradient } from "expo-linear-gradient";
import BookmarkPost from "./BookmarkedPosts";
import CommentBox from "./CommentBox";
import auth from "@react-native-firebase/auth";
import { fetchComments } from "@utils/commenting/functions";

const Posts = ({
  postsRef,
  commentsRef,
  openDeleteModal,
  showBookmarkPost = true,
}: {
  postsRef: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;
  commentsRef?: FirestoreComment;
  openDeleteModal?: (post: FirestorePost) => void;
  showBookmarkPost?: boolean;
}) => {
  const [posts, setPosts] = useState<FirestorePost[] | null>(null);
  const [comments, setComments] = useState<FirestoreComment[] | null>(null);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const { user } = userStore((state) => state);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const subscriber = postsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot) {
        const updatedPosts: FirestorePost[] = [];
        querySnapshot.forEach((doc) => {
          updatedPosts.push({
            content: doc.get("content"),
            uid: doc.get("uid"),
            timestamp: doc.get("timestamp"),
            displayName: doc.get("displayName"),
            post_id: doc.get("post_id"),
            likedPost: doc.get("likedPost"),
            photoURL: doc.get("photoURL"),
            bookmarkedPosts: doc.get("bookmarkedPosts"),
          } as FirestorePost);
        });
        setPosts(updatedPosts);
      }
    });
    return subscriber; // On unmount end listener
  }, []);

  // const fetchComments = async (post_id: string) => {
  //   try {
  //     const commentsSnapshot = await postsRef
  //       .doc(post_id)
  //       .collection('comments')
  //       .get();

  //     const updatedComments: FirestoreComment[] = [];

  //     commentsSnapshot.forEach((commentDoc: any) => {
  //       updatedComments.push({
  //         comment: commentDoc.get('comment'),
  //         comment_id: commentDoc.get('comment_id'),
  //         displayName: commentDoc.get('displayName'),
  //         timestamp: commentDoc.get('timestamp'),
  //         post_id: post_id,
  //         photoURL: commentDoc.get('photoURL'),
  //         likedComment: commentDoc.get('likedComment')
  //       } as FirestoreComment);
  //     });
  //     setComments(updatedComments);
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //   }
  // };

  const CommentBoxWrapper: React.FC<{ post_id: string | null }> = ({
    post_id,
  }) => {
    return (
      <CommentBox
        post_id={post_id}
        user={user}
        posts={posts}
        comments={comments}
        setOpenCommentModal={setOpenCommentModal}
        fetchComments={fetchComments}
        setSelectedPostId={setSelectedPostId}
      />
    );
  };

  // FORM ***************************************************************
  return (
    <>
      <ScrollView>
        {posts
          ?.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
          .map((post) => (
            <View key={post.post_id} style={styles.postsContainer}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <View
                  key={post.post_id}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}>
                  <Image
                    source={{ uri: post.photoURL }}
                    style={{ height: 35, aspectRatio: 1, borderRadius: 50 }}
                  />

                  <View>
                    <Text style={styles.name}>{post.displayName}</Text>
                    <Text>
                      {post.timestamp?.seconds &&
                        post.timestamp.toDate().toLocaleString()}
                    </Text>
                  </View>
                </View>

                {userId !== post.uid && showBookmarkPost && (
                  <BookmarkPost post={post} />
                )}
              </View>

              <View>
                <Text style={constStyles.postText}>{post.content}</Text>
                <View style={styles.labels}>
                  <LikeAPost post={post} />
                  <CommentPost
                    post={post}
                    comments={comments ?? []}
                    onPress={(post_id) => {
                      setSelectedPostId(post_id);
                      setOpenCommentModal(true);
                      fetchComments(post_id);
                    }}
                  />
                </View>
              </View>

              {openDeleteModal && (
                <View style={{ position: "absolute", top: 0, right: 15 }}>
                  {userId == post.uid && (
                    <Pressable
                      style={{ paddingHorizontal: 18, paddingVertical: 15 }}
                      onPress={() => openDeleteModal(post)}>
                      <EllipsisMenu scale={0.9} height={30} width={20} />
                    </Pressable>
                  )}
                </View>
              )}

              {/* COMMENTS MODAL START */}

              <Modal animationType="slide" visible={openCommentModal}>
                <LinearGradient
                  start={{ x: 0, y: 0.0 }}
                  end={{ x: 1, y: 0.0 }}
                  colors={[
                    "rgba(115, 69, 149, 0.2)",
                    "rgba(72, 104, 167, 0.2)",
                  ]}
                  style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                    }}>
                    <CommentBoxWrapper post_id={selectedPostId} />
                    <NewComment
                      post_id={selectedPostId!}
                      onSubmit={() => fetchComments(selectedPostId)}
                    />
                  </View>
                </LinearGradient>
              </Modal>

              {/* COMMENTS MODAL END */}
            </View>
          ))}
      </ScrollView>
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    height: "100%",
  },
  button: {
    marginTop: 10,
  },
  postsContainer: {
    marginVertical: 3,
    width: "100%",
    paddingLeft: 10,
    paddingBottom: 8,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 12,
  },
  filterButton: {
    borderColor: "black",
    borderWidth: 1,
    width: "40%",
    alignItems: "center",
  },
  labels: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  name: {
    fontSize: 19,
  },
  commentContainer: {
    width: "100%",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: "white",
    gap: 8,
  },
});
