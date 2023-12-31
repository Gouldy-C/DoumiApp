import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {  router } from 'expo-router'

const AuthDrawer = (props : DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text> Auth Menu</Text>
      </View>
      <DrawerItem
        label={'Sign Up'}
        onPress={() => router.push('/(auth)/sign-up')}/>
      <DrawerItem
        label={'Sign In'}
        onPress={() => router.push('/(auth)/sign-in')}/>
      <DrawerItem
        label={'Community Feed'}
        onPress={() => router.push('/(user)/feed')}/>
    </DrawerContentScrollView>
  )
}

export default AuthDrawer

const styles = StyleSheet.create({})