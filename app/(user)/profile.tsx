import {Text, View, StyleSheet, Button, Image, Pressable} from 'react-native'
import React from 'react'
import { logout } from '@utils/auth/general'
import { userStore } from '@utils/stores/userStore'

const UserProfile = () => {

  const {user} = userStore((state) => state)

  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical:10}}>User Profile</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',}}>
          {user?.photoURL && 
          <Image 
            source={{uri: user.photoURL}}
            style={{height: 90, aspectRatio: 1, borderRadius: 50, margin: 10,}}
            />}
          <View style={{marginHorizontal: 10}}>
            <Text>{user?.displayName}</Text>
            <Text>{user?.email}</Text>
            <View style={{marginVertical: 10}}>
              <Button
                onPress={logout}
                title='Logout'/>
            </View>
          </View>
        </View>
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