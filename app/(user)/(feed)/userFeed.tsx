import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserFeed = () => {
  return (
    <View style={styles.safeView}>
      <Text style={{fontSize: 18, paddingVertical: 10}}>User Feed</Text>
    </View>
  )
}

export default UserFeed

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})