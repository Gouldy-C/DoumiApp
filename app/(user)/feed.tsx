import {Text, View, StyleSheet} from 'react-native'
import React from 'react'
import { userStore } from '@utils/stores/userStore';

const UserFeed = () => {
  const {user} = userStore((state) => state)
  
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