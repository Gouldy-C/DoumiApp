import {Text, View, StyleSheet, Button, Image } from 'react-native'
import React from 'react'
import { logout } from '@utils/auth/general'
import { userStore } from '@utils/stores/userStore'
import UserPosts from '@components/UserPosts'

const UserProfile = () => {

  const {authUser} = userStore((state) => state)

  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row', alignItems:'center', backgroundColor: 'white'}}>
        {authUser?.photoURL && 
          <Image 
            source={{uri: authUser.photoURL}}
            style={{height: 90, aspectRatio: 1, borderRadius: 50, margin: 10,}}
          />
        }
        <View style={{marginHorizontal: 10}}>
          <Text>{authUser?.displayName}</Text>
          <Text>{authUser?.email}</Text>
          <View style={{marginVertical: 10}}>
            <Button
              onPress={logout}
              title='Logout'/>
          </View>
        </View>
      </View>

      <UserPosts/>

    </View>
  )
}

export default UserProfile