import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import Posts from '@components/Posts';




const UserFeed = () => {
  // Use custom stores to retrieve user information and user feed state
  const userId = auth().currentUser?.uid
  const favPostsRef = firestore().collection('Posts').where("likedPost", "array-contains", userId)

  
  return (
    <>
      <View style={{marginTop: 10, alignItems:'center'}}>
        <TextInput
          placeholder='Search tags'
          style={{backgroundColor:'purple', height: 50, width: '80%', borderRadius: 8, fontSize: 20}}>
        </TextInput>
      </View>
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Posts  postsRef={favPostsRef}/>
        </View>
      </SafeAreaView>
    </>
  )
}

export default UserFeed

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
  },
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignItems: 'center',
  }
})