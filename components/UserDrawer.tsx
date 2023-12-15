import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {  router } from 'expo-router'

const UserDrawer = (props : DrawerContentComponentProps) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View>
          <Text> User Menu</Text>
        </View>

          <DrawerItem
            label={'Feed'}
            onPress={() => router.push('/(user)/feed')}/>
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
          onPress={() => router.push('/(user)/settings')}/>
        <DrawerItem
          label={'Logout'}
          onPress={() => router.push('/(user)/logout')}/>
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