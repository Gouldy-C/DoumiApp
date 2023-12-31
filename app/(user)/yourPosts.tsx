import {Text, View, StyleSheet, Button, TextInput, FlatList, Pressable} from 'react-native';
import React from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const yourPosts = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>Your Posts</Text>
      </View>
  )
}

export default yourPosts

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})