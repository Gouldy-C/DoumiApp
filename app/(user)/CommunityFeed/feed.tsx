import {Text, View, StyleSheet, Button, TextInput, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import { userStore, useUserFeedStore } from '@utils/stores/userStore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FirestoreDocument } from '@utils/types/types';

const UserFeed = () => {
  // Use custom stores to retrieve user information and user feed state
  const {user} = userStore((state) => state)
  const { inputValue, posts, setInputValue, setPosts } = useUserFeedStore();
  const [likedPosts, setLikedPosts] = useState(0)


// UPDATE THE POST POST STATE *******************************************
  // Set up an effect to subscribe to updates in the 'posts' collection
  useEffect(() => {
    const postsRef = firestore().collection('Posts');
    const orderedPostsRef = postsRef.orderBy('timestamp')

    // Subscribe to updates in the 'posts' collection
    const unsubscribe = orderedPostsRef.onSnapshot((querySnapshot) => {
    // Create an array to store updated posts
      const updatedPosts: FirestoreDocument[] = [];
    // Iterate through each document in the 'Posts' collection     
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ 
          content: doc.get('content'),
          uid: doc.get('uid'),
          timestamp: doc.get('timestamp'),
          displayName:doc.get('displayName'),
          post_id: doc.get('post_id'),
          likedPost:doc.get('likedPost')
        } as FirestoreDocument);
      });

      // Update the state with the new posts
      setPosts(updatedPosts);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // Only run this effect once on mount
  

  const handleInputChange = (text:string) => {
    setInputValue(text);
  };


// POST A POST ******************************************************
const handlePost = async () => {
  try {
    const currentUser = auth().currentUser;


    if (!currentUser || inputValue.trim() === '') {
      // Don't post empty messages and if the user is not logged in
      return;
    }

    // Reference to the 'posts' and 'users' collection in Firestore
    const postsRef = firestore().collection('Posts');
    const displayNameRef = firestore().collection('Users');

    // Fetch the username based on the current user's UID
    const userSnapshot = await displayNameRef.doc(currentUser.uid).get();

    if (userSnapshot.exists) {
      const userDoc = userSnapshot.data();

      if (userDoc) {
        const displayName = userDoc.displayName;
        const postId = Math.random() + currentUser.uid + Math.random()

        // Add a new post document
        await postsRef.add({
          uid: currentUser.uid,
          content: inputValue,
          timestamp: firestore.FieldValue.serverTimestamp(),
          displayName: displayName,
          post_id: postId,
          likedPost: []
        });

        // Clear the input after posting
        setInputValue('');
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


// DELETE A POST ****************************************************
  const handleDelete = async (documentId:string) => {
    try {
      // Delete the entire document based on the document ID
      await firestore().collection('Posts').doc(documentId).delete();

    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  

//  LIKE A POST *****************************************************
const likedPostArray = firestore().collection('Post'); // Note: Collection name should match

const handleLike = async (post_id: string) => {
  try {
    const currentUser = auth().currentUser;
    const userId = currentUser?.uid;

    // Get a reference to the document with the specified post_id
    const postDocRef = likedPostArray.doc(post_id);

    // Check if the document exists
    const postDocSnapshot = await postDocRef.get();

    if (postDocSnapshot.exists) {
      // Document with post_id exists, update likedPosts array
      await postDocRef.update({
        likedPosts: firestore.FieldValue.arrayUnion(userId),
      });
      setLikedPosts((prevLikedPosts)=> prevLikedPosts + 1);
      console.log('Like added successfully!');
    } else {
      console.log(`Document with post_id ${post_id} does not exist`);
      // Handle the case where the document doesn't exist (if needed)
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
};



// FORM ***************************************************************
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>Your Feed</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Type something...'
            onChangeText={handleInputChange}
            value={inputValue}
          />
        </View>
        <View style={styles.button}>
          <Button title="Post" onPress={handlePost} />
        </View>
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View>
                <Text>{item.content}</Text>
                <Text>{item.displayName}</Text>
                <Pressable onPress={handleLike}><Icon name="heart" size={20} color="red" /></Pressable>
                <Text>{likedPosts}</Text>
              </View>
            )}
          />
        </View>
      </View>
  )
}

export default UserFeed

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "80%",
    height: "30%",
    alignSelf: "center",
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 1,
  },
  input: {
    backgroundColor: 'white',
    height: '100%'
  },
  button: {
    marginTop: 10
  },
  postsContainer: {
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: "90%"
  }
})