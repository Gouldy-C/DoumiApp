import {Text, View, StyleSheet, Button, Image } from 'react-native'
import React from 'react'
import { logout } from '@utils/auth/general'
import { userStore } from '@utils/stores/userStore'
import UserPosts from '@components/UserPosts'

const UserProfile = () => {

  const {user} = userStore((state) => state)

  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row', alignItems:'center'}}>
        {user?.photoURL && 
          <Image 
            source={{uri: user.photoURL}}
            style={{height: 90, aspectRatio: 1, borderRadius: 50, margin: 10,}}
          />
        }
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

      <UserPosts/>

    </View>
  )
}

export default UserProfile