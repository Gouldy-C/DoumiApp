import {View, 
  StyleSheet,
} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import PostListView from '@components/PostListView';


const UserFeed = () => {
  const postsRef = firestore().collection('Posts')

  return (
    <LinearGradient
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0.0 }}
      colors={['rgba(80, 73, 164, 0.2)', 'rgba(56, 85, 146, 0.2)']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <PostListView
          postsRef={postsRef}/>
      </View>
    </LinearGradient>

  )
}

export default UserFeed

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignItems: 'center',
  }
})