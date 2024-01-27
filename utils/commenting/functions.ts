import { UserDoc } from './../types/types';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';
import { FirestoreComment } from '@utils/types/types';


// POST A COMMENT *****************************************************
export const handleComment = async ({post_id, input, userDoc} :
  {post_id:string; input:string, userDoc: UserDoc}) => {
    const userId= auth().currentUser?.uid
    const postsRef = firestore().collection('Posts')
  
    try {
      if (!auth().currentUser || input.trim() === '') {
        return
      }
  
      if (userDoc.uid === userId) {
          const displayName = userDoc.displayName;
          const comment_id = Crypto.randomUUID();
          const photoURL = userDoc.photoURL;
  
          await postsRef.doc(post_id).collection('comments').doc(comment_id).set({
            comment: input,
            displayName: displayName,
            timestamp: firestore.FieldValue.serverTimestamp(),
            uid: userId,
            post_id: post_id,
            likedArray: [],
            comment_id: comment_id,
            photoURL: photoURL
          });
      } else {
        console.error('User not found in the Users collection');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };
  

  // FETCH A COMMENT ******************************************
export const fetchComments = async (post_id: string, setComments:(comments:FirestoreComment[])=>void) => {
  const postsRef = firestore().collection('Posts')

  try {
    const commentsSnapshot = await postsRef
      .doc(post_id)
      .collection('comments')
      .get();

    const updatedComments: FirestoreComment[] = [];
    

    commentsSnapshot.forEach((commentDoc: any) => {
      updatedComments.push({
        comment: commentDoc.get('comment'),
        comment_id: commentDoc.get('comment_id'),
        displayName: commentDoc.get('displayName'),
        timestamp: commentDoc.get('timestamp'),
        post_id: post_id,
        photoURL: commentDoc.get('photoURL'),
        likedArray: commentDoc.get('likedArray')
      } as FirestoreComment);
    });
    setComments(updatedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
  