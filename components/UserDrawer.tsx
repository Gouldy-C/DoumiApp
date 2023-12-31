import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {  router } from 'expo-router'
import { userStore } from '@utils/stores/userStore'
import { logout } from '@utils/auth/general'

const UserDrawer = (props : DrawerContentComponentProps) => {
  const {user} = userStore((state) => state)

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
          {user?.photoURL && 
          <Image 
            source={{uri: user.photoURL}}
            style={{height: 90, aspectRatio: 1, borderRadius: 50, margin: 10,}}
            />}
          <View>
            <Text>{user?.displayName}</Text>
            <Text>{user?.email}</Text>
          </View>
        </View>

          <DrawerItem
            label={'Feed'}
            onPress={() => router.push('/(user)/(feed)/userFeed')}/>
          <DrawerItem
            label={'Groups'}
            onPress={() => router.push('/(user)/groups')}/>
          <DrawerItem
            label={'Favorites'}
            onPress={() => router.push('/(user)/favorites')}/>
          <DrawerItem
            label={'De Escalation'}
            onPress={() => router.push('/(user)/(de-escalation)/de-escalation')}/>
      </DrawerContentScrollView>
      <View style={styles.drawerFooter}>
        <DrawerItem
          label={'Settings'}
          onPress={() => router.push('/(user)/profile')}/>
        <DrawerItem
          label={'Logout'}
          onPress={() => logout()}/>
      </View>
    </View>
  )
}

export default UserDrawer

const styles = StyleSheet.create({
  drawerFooter: {
    justifyContent: 'flex-end'
  }
})