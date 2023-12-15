import {Text, View, StyleSheet} from 'react-native'
import React from 'react'

const UserGroups = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>User Groups</Text>
      </View>
  )
}

export default UserGroups

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})