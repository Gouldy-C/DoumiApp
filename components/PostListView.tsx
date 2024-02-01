import { FirestorePost } from "@utils/types/types";
import { Text, View, StyleSheet, Image, FlatList, ScrollView,Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import BookmarkPost from "./BookmarkedPosts";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import CommentButton from "./CommentButton";
import EditDeletePost from "./EditDeletePost";
import LikeAThing from "@components/LikeAThing";
import firestore from '@react-native-firebase/firestore';
import { calculateTimeDifference } from "@utils/timeFunctions";
import auth from '@react-native-firebase/auth'
import { searchStore } from "@utils/stores/searchStore";
import { useFonts } from 'expo-font';

const PostListView = ({
  postsRef,
}: {
  postsRef: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;
}) => {
  const postCollection = firestore().collection('Posts')
  const setSearch = searchStore((state) => state.setSearch)
  const [posts, setPosts] = useState<FirestorePost[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);

  const togglePostExpansion = (postId: string) => {
    setExpandedPosts((prevExpandedPosts)=> 
      prevExpandedPosts.includes(postId)
      ? prevExpandedPosts.filter((id)=> id !== postId)
      : [...prevExpandedPosts, postId]
    );
  };

  
  

  useEffect(() => {
    const subscriber = postsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot) {
        const updatedPosts: FirestorePost[] = [];
        querySnapshot.docs.map((documentSnapshot) => {
          updatedPosts.push({
            content: documentSnapshot.get("content"),
            uid: documentSnapshot.get("uid"),
            timestamp: documentSnapshot.get("timestamp"),
            displayName: documentSnapshot.get("displayName"),
            post_id: documentSnapshot.get("post_id"),
            likedArray: documentSnapshot.get("likedArray"),
            photoURL: documentSnapshot.get("photoURL"),
            bookmarkedPosts: documentSnapshot.get("bookmarkedPosts"),
            updated: documentSnapshot.get("updated"),
            updatedTimestamp: documentSnapshot.get("updatedTimestamp"),
            hashTags: documentSnapshot.get("hashTags"),
          } as FirestorePost);
        });
        setPosts(updatedPosts);
      }
    }, (error) => console.error(error));
  
    return subscriber;
  }, [postsRef]);

 
  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
    VerdanaBold: require('../assets/fonts/verdana-bold.ttf'),
    Verdana: require('../assets/fonts/verdana.ttf'),
  });


  if (error) {
    console.error('Font loading error:', error);
  }
  
  if (!loaded) {
    return null; 
  }

  return (
    <FlatList
    data={posts}
    style={{}}
    contentContainerStyle={{ gap:12, paddingVertical: 12}}
    keyExtractor={(item) => item.post_id}
    renderItem={({ item: post }) => (
            <View key={post.post_id} style={styles.postsContainer}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 10}}>
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
                    style={{ height: 40, aspectRatio: 1 }}
                  />

                  <View>
                    <Text style={styles.name}>{post.displayName}</Text>
                    <Text style={{opacity: 0.7, fontFamily: 'Inter' }}>
                      {post.timestamp?.seconds &&
                        calculateTimeDifference(post.timestamp.toDate())}
                    </Text>
                  </View>

                </View>
                {post.uid === auth().currentUser?.uid ? 
                  <EditDeletePost post={post} />
                  :
                  <BookmarkPost post={post} />
                }
              </View>
              <View>
              <Pressable onPress={() => togglePostExpansion(post.post_id)} style={{paddingHorizontal: 10}}>
                <Text style={styles.postText} numberOfLines={expandedPosts.includes(post.post_id) ? undefined : 4}>
                  {post.content}
                </Text>
                </Pressable>
                <ScrollView style={{flexGrow: 0, maxHeight: 90, marginVertical: 22, paddingHorizontal: 16}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
                  {
                    post.hashTags.map((tag) => (
                        <Text key={tag} onPress={() => setSearch([tag])} style={{color: '#2B789D', fontSize: 16, fontFamily: "VerdanaBold", paddingRight: '3%'}}>{tag}</Text>
                      ))
                  }
                </ScrollView>
                <View style={styles.labels}>
                  <LikeAThing post={post} firestoreRef={firestore().collection('Posts').doc(post.post_id)}/>
                  <CommentButton post={post} />
                </View>
              </View>
            </View>
          )}
    />
  );
};

export default PostListView;

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
    width: "100%",
    paddingLeft: 10,
    paddingVertical: 24,
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
    paddingHorizontal: 10,
    gap: 15,
    alignItems: "center",
  },
  name: {
    fontSize: 19,
    fontFamily: "Inter"
  },
  commentContainer: {
    width: "100%",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: "white",
    gap: 8
  },
  postText: {
    fontSize: 18,
    paddingBottom: 15,
    paddingHorizontal: 8,
    fontFamily: "Verdana"
  }
});
