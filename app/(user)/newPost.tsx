import {Text, View, StyleSheet} from 'react-native'
import React from 'react'

const NewPost = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>New Post</Text>
      </View>
  )
}

export default NewPost

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})