import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import * as Crypto from 'expo-crypto'
import { FirestoreComment, FirestorePost } from '@utils/types/types'
import { userStore } from '@utils/stores/userStore'


// DELETE A POST ****************************************************
export const deletePost = async (post:FirestorePost) => {
  if (auth().currentUser?.uid === post.uid) {
    try {
      await firestore()
      .collection('Posts')
      .doc(post.post_id)
      .delete()
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
}

//  LIKE A POST *****************************************************
export const handleLike = async (docRef:FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>) => {
  const userId = auth().currentUser?.uid;

  try {
    const postDocSnapshot = await docRef.get();
    const data = postDocSnapshot.data();

    if (postDocSnapshot && data) {
      if (data.likedArray.includes(userId)){
        await docRef.update({
          likedArray: firestore.FieldValue.arrayRemove(userId),
        })
        return
      } 
      else {
        // Document with post_id exists, update likedPosts array
        await docRef.update({
          likedArray: firestore.FieldValue.arrayUnion(userId),
        });
      }
    } else {
      console.error(`Document does not exist` , docRef.path);
      // Handle the case where the document doesn't exist (if needed)
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
};


// POST A POST ******************************************************
export const handlePost = async (input: string, hashTags?: string[]) => {
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
        const photoURL = userDoc.photoURL

        // Add a new post document
        await postsRef.doc(postId)
        .set({
          uid: auth().currentUser?.uid,
          content: input,
          timestamp: firestore.FieldValue.serverTimestamp(),
          displayName: displayName,
          post_id: postId,
          likedArray: [],
          hashTags: hashTags ? hashTags : [],
          photoURL: photoURL,
          bookmarkedPosts: [],
          updated: false,
          updatedTimestamp: null
        } as FirestorePost);

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
export const updatePost = async (postId: string ,input: string, hashTags: string[]) => {
  const postRef = firestore().collection('Posts').doc(postId)
  const authUid = auth().currentUser?.uid

  try {
      if (!auth().currentUser || input.trim() === '') {
        return;
      }
      const postDocSnapshot = (await postRef.get()).data()
      if (postDocSnapshot && authUid === postDocSnapshot.uid) {
        await postRef.update({
          hashTags: hashTags,
          content: input,
          updated: true,
          updatedTimestamp: firestore.FieldValue.serverTimestamp(),
        })
      } else {
        console.error('User not found in the Users collection');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
};

// Bookmark a Post****************************************
export const handleBookMark = async (post_id: string) => {
  const userId = auth().currentUser?.uid;
  const postRef = firestore().collection('Posts').doc(post_id)

  try {
    const postDocSnapshot = await postRef.get();
    const data = postDocSnapshot.data();

    if (postDocSnapshot && data) {
      if (data.bookmarkedPosts.includes(userId)){
        await postRef.update({
          bookmarkedPosts: firestore.FieldValue.arrayRemove(userId),
        })
        return
      } 
      else {
        // Document with post_id exists, update likedPosts array
        await postRef.update({
          bookmarkedPosts: firestore.FieldValue.arrayUnion(userId),
        });
      }
    } else {
      console.error(`Document with post_id ${post_id} does not exist`);
      // Handle the case where the document doesn't exist (if needed)
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
};