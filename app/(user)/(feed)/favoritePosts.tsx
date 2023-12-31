import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FavoritePosts = () => {
  return (
    <View style={styles.safeView}>
      <Text style={{fontSize: 18, paddingVertical: 10}}>Favorite Posts</Text>
    </View>
  )
}

export default FavoritePosts

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})