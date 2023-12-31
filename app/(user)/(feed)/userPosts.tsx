import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserPosts = () => {
  return (
    <View style={styles.safeView}>
      <Text style={{fontSize: 18, paddingVertical: 10}}>User Posts</Text>
    </View>
  )
}

export default UserPosts

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})