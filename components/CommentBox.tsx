import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Keyboard } from 'react-native'
import { FirestorePost } from '@utils/types/types';
import { FirestoreComment } from '@utils/types/types';
import firestore from '@react-native-firebase/firestore';
import LikeAThing from './LikeAThing';
import { calculateTimeDifference } from '@utils/timeFunctions';


interface CommentBoxProps {
  post: FirestorePost;
}

const CommentBox: React.FC<CommentBoxProps> = ({post}) => {
  const commentsRef = firestore().collection('Posts').doc(post.post_id).collection('comments')
  const [comments, setComments] = useState<FirestoreComment[]>([])
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const subscriber = commentsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot){ 
        const updatedPosts: FirestoreComment[] = []   
        querySnapshot.forEach((doc) => {
          updatedPosts.push({ 
            comment: doc.get('comment'),
            uid: doc.get('uid'),
            timestamp: doc.get('timestamp'),
            post_id: doc.get('post_id'),
            displayName: doc.get('displayName'),
            likedArray: doc.get('likedArray'),
            comment_id: doc.get('comment_id'),
            photoURL: doc.get('photoURL')
          } as FirestoreComment);
        });
        setComments(updatedPosts);
    }
    });

    return subscriber // On unmount end listener
  }, [post]);



  return (
    <FlatList
      data={comments}
      keyExtractor={item => item.comment_id}
      style={{flex: 1, marginTop: 2, opacity: isKeyboardOpen ? 0.5 : 1 }}
      renderItem={({ item }) => (
        <View key={item.comment_id} style={styles.commentContainer}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15, alignItems: 'center', paddingHorizontal: 12 }}>
                <Image
                  source={{uri: item.photoURL}}
                  style={{ height: 35, aspectRatio: 1, borderRadius: 50 }}
                />
              <View>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>{item.displayName}</Text>
                <Text style={{opacity: 0.7}}>
                  {item.timestamp && calculateTimeDifference(item.timestamp.toDate())}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20 }}>
                <LikeAThing post={item} firestoreRef={commentsRef.doc(item.comment_id)}/>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 17, width: "70%", marginLeft: 61 }}>{(item as FirestoreComment).comment}</Text>
            </View>
        </View>
      )}
    />
  );
};

export default CommentBox;


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
    backgroundColor: 'white',
    height: '100%'
  },
  button: {
    marginTop: 10
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignItems: 'center',
  },
  labels: {
    flexDirection:'row', 
    gap: 15,
    alignItems: 'center'
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
    gap: 10,
    
  }
})