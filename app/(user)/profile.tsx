import {Text, View, Button } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { logout } from '@utils/auth/general'
import { userStore } from '@utils/stores/userStore'
import UserPosts from '@components/UserPosts'

const UserProfile = () => {

  const userDoc = userStore((state) => state.userDoc)

  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row', alignItems:'center', backgroundColor: 'white'}}>
        {userDoc?.photoURL && 
          <Image
          style={{height: 80, width: 80, marginHorizontal: 15, marginVertical: 15}}
          source={userDoc?.photoURL}
          placeholder={'Profile picture'}
        />
        }
        <View style={{marginHorizontal: 10}}>
          <Text>{userDoc?.displayName}</Text>
          <Text>{userDoc?.email}</Text>
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