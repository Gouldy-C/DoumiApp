import {Text, View, StyleSheet, Button} from 'react-native'
import React from 'react'
import { logout } from '@utils/auth/general'

const UserProfile = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>User Profile</Text>
        <Button
          onPress={logout}
          title='Logout'/>
      </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})