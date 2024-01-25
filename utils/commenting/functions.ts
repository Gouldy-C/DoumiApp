import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';


// POST A COMMENT *****************************************************
export const handleComment = async ({post_id, input}:{post_id:string; input:string}) => {
    const userId= auth().currentUser?.uid;
    const usersRef = firestore().collection('Users')
    const postsRef = firestore().collection('Posts')
  
    try {
  
      if (!auth().currentUser || input.trim() === '') {
        return
      }
  
      const userSnapshot = await usersRef.doc(auth().currentUser?.uid).get();
  
      if (userSnapshot.exists) {
        const userDoc = userSnapshot.data();
  
        if (userDoc) {
          const displayName = userDoc.displayName;
          const comment_id = Crypto.randomUUID();
          const photoURL = userDoc.photoURL;
  
          await postsRef.doc(post_id).collection('comments').doc(comment_id).set({
            comment: input,
            displayName: displayName,
            timestamp: firestore.FieldValue.serverTimestamp(),
            uid: userId,
            post_id: post_id,
            likedComment: [],
            comment_id: comment_id,
            photoURL: photoURL
          });
  
        } else {
          console.error('User document is undefined in the Users collection');
        }
      } else {
        console.error('User not found in the Users collection');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  
  };
  
  
  //  LIKE A COMMENT *****************************************************
  export const handleLikeComment = async (post_id: string, comment_id: string) => {
    const userId = auth().currentUser?.uid;
    const commentRef = firestore().collection('Posts').doc(post_id).collection('comments').doc(comment_id);
  
    try {
      const commentDocSnapshot = await commentRef.get();
      const data = commentDocSnapshot.data();
  
      if (commentDocSnapshot && data ) {
        const likedCommentArray = data?.likedComment || [];
  
        if (likedCommentArray.includes(userId)) {
          await commentRef.update({
            likedComment: firestore.FieldValue.arrayRemove(userId),
          });
          console.log('Removed like successfully');
        } else {
          await commentRef.update({
            likedComment: firestore.FieldValue.arrayUnion(userId),
          });
          console.log('Added like successfully');
        }
      } else {
        console.log(`Document with post_id ${post_id} and comment_id ${comment_id} does not exist`);
        // Log the entire snapshot to inspect its contents
        console.log('Snapshot:', commentDocSnapshot);
      }
    } catch (error) {
      console.error('Error adding/removing like:', error);
    }
  };
  

  // FETCH A COMMENT ******************************************

  