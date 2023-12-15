import {Text, View, StyleSheet} from 'react-native'
import React from 'react'

const UserLogout = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>User Logout</Text>
      </View>
  )
}

export default UserLogout

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})