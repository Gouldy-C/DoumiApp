import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';



const postsRef = firestore().collection('Posts');
const currentUser = auth().currentUser
const usersRef = firestore().collection('Users');


// DELETE A POST ****************************************************
export const deletePost = async (post_id:string) => {
  try {
    // Delete the document with the specified post_id
    await firestore()
    .collection('Posts')
    .doc(post_id)
    .delete()
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document:', error);
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
        return
      } 
      else {
        // Document with post_id exists, update likedPosts array
        await postDocRef.update({
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