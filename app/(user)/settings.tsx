import {Text, View, StyleSheet} from 'react-native'
import React from 'react'

const UserSettings = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>User Settings</Text>
      </View>
  )
}

export default UserSettings

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})