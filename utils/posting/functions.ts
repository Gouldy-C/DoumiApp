import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';
import { FirestorePost } from '@utils/types/types';


// DELETE A POST ****************************************************
export const deletePost = async (post:FirestorePost) => {
  try {
    await firestore()
    .collection('Posts')
    .doc(post.post_id)
    .delete()
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document:', error);
}
};

//  LIKE A POST *****************************************************
export const handleLike = async (post_id: string) => {
  const userId = auth().currentUser?.uid;
  const postRef = firestore().collection('Posts').doc(post_id)

  try {
    const postDocSnapshot = await postRef.get();
    const data = postDocSnapshot.data();

    if (postDocSnapshot && data) {
      if (data.likedPost.includes(userId)){
        await postRef.update({
          likedPost: firestore.FieldValue.arrayRemove(userId),
        })
        return
      } 
      else {
        // Document with post_id exists, update likedPosts array
        await postRef.update({
          likedPost: firestore.FieldValue.arrayUnion(userId),
        });
      }
    } else {
      console.log(`Document with post_id ${post_id} does not exist`);
      // Handle the case where the document doesn't exist (if needed)
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
};


// POST A POST ******************************************************
export const handlePost = async (input: string) => {
  const usersRef = firestore().collection('Users')
  const postsRef = firestore().collection('Posts')

  try {
    if (!auth().currentUser || input.trim() === '') {
      // Don't post empty messages and if the user is not logged in
      return;
    }

    // Fetch the username based on the current user's UID
    const userSnapshot = await usersRef.doc(auth().currentUser?.uid).get();

    if (userSnapshot.exists) {
      const userDoc = userSnapshot.data();

      if (userDoc) {
        const displayName = userDoc.displayName;
        const postId = Crypto.randomUUID()

        // Add a new post document
        await postsRef.doc(postId)
        .set({
          uid: auth().currentUser?.uid,
          content: input,
          timestamp: firestore.FieldValue.serverTimestamp(),
          displayName: displayName,
          post_id: postId,
          likedPost: []
        });

        // Clear the input after posting
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
        const commentId = Crypto.randomUUID()

        await postsRef.doc(post_id).collection('comments').doc(commentId).set({
          comment: input,
          displayName: displayName,
          timestamp: firestore.FieldValue.serverTimestamp(),
          uid: userId,
          post_id: post_id
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