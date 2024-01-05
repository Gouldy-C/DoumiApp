import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';



const postsRef = firestore().collection('Posts');
const currentUser = auth().currentUser
const usersRef = firestore().collection('Users');


// DELETE A POST ****************************************************
export const handleDelete = async (documentId:string) => {
  try {
    // Delete the entire document based on the document ID
    await firestore().collection('Posts').doc(documentId).delete();

  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

//  LIKE A POST *****************************************************
export const handleLike = async (post_id: string) => {
  const userId = auth().currentUser?.uid;
  const postsRef = firestore().collection('Posts');

  try {
    // Get a reference to the document with the specified post_id
    const postDocRef = postsRef.doc(post_id);

    // Check if the document exists
    const postDocSnapshot = await postDocRef.get();
    const data = postDocSnapshot.data();

    if (postDocSnapshot && data) {
      if (data.likedPost.includes(userId)){
        await postDocRef.update({
          likedPost: firestore.FieldValue.arrayRemove(userId),
        })
        await usersRef.doc(userId).update({
          likedPosts: firestore.FieldValue.arrayRemove(post_id),
        })
        return
      } 
      else {
        // Document with post_id exists, update likedPosts array
        await postDocRef.update({
          likedPost: firestore.FieldValue.arrayUnion(userId),
        });
        await usersRef.doc(userId).update({
          likedPosts: firestore.FieldValue.arrayUnion(post_id),
        })
        console.log('Like added successfully!');
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
  try {
    if (!currentUser || input.trim() === '') {
      // Don't post empty messages and if the user is not logged in
      return;
    }

    // Fetch the username based on the current user's UID
    const userSnapshot = await usersRef.doc(currentUser.uid).get();

    if (userSnapshot.exists) {
      const userDoc = userSnapshot.data();

      if (userDoc) {
        const displayName = userDoc.displayName;
        const postId = Crypto.randomUUID()

        // Add a new post document
        await postsRef.doc(postId)
        .set({
          uid: currentUser.uid,
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