import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Keyboard } from 'react-native'
import { FirestorePost } from '@utils/types/types';
import { FirestoreComment } from '@utils/types/types';
import firestore from '@react-native-firebase/firestore';
import LikeAThing from './LikeAThing';
import { calculateTimeDifference } from '@utils/timeFunctions';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';


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

  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
    VerdanaBold: require('../assets/fonts/verdana-bold.ttf'),
    Verdana: require('../assets/fonts/verdana.ttf'),
    InterSemibold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });


  if (error) {
    console.error('Font loading error:', error);
  }
  
  if (!loaded) {
    return null; 
  }

  return (
    <>
      <View style={{ height: 2, backgroundColor: '#D5E4EB' }} />
      <Text style={{fontSize: 20, fontWeight: '700', color: '#424052', textAlignVertical: 'center', marginBottom: 5, marginHorizontal: 24, marginVertical: 36}} >
        Comments
      </Text>
      {comments.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds).map((comment) => {
        return(
          <View key={comment.comment_id} style={styles.commentContainer}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15, alignItems: 'center', paddingHorizontal: 12 }}>
              <Image
                source={{uri: comment.photoURL}}
                style={{ height: 40, aspectRatio: 1 }}
              />
              <View>
                <Text style={{ fontSize: 17, fontWeight: '500', fontFamily: 'Inter' }}>{comment.displayName}</Text>
                <Text style={{opacity: 0.7, fontFamily: 'Verdana'}}>
                  {comment.timestamp && calculateTimeDifference(comment.timestamp.toDate())}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 0, }}>
                <LikeAThing post={comment} firestoreRef={commentsRef.doc(comment.comment_id)} scale={0.85}/>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 17, width: "84%", paddingRight: 50, marginLeft: 'auto', fontFamily: 'Verdana' }}>{(comment as FirestoreComment).comment}</Text>
            </View>
          </View>
        )
      })}
    </>
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
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: 'white',
    gap: 10,
    borderRadius: 15,
    marginVertical: 28,
  }
})