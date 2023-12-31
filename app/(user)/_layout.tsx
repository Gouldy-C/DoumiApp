import React from 'react'
import Drawer from 'expo-router/drawer'
import UserDrawer from '../../components/UserDrawer'
import { userStore } from '@utils/stores/userStore'
import { Redirect } from 'expo-router'

const UserLayout = () => {
  const {user} = userStore((state) => state)

  if (!user){
    return <Redirect href={'/(auth)/sign-in'}/>
  }

  return (
    <Drawer drawerContent={(props) => <UserDrawer {...props}/>}>
      <Drawer.Screen
        name='feed'
        options={{
          headerTitle: 'Feed',
        }}/>
      <Drawer.Screen
        name='groups'
        options={{
          headerTitle: 'Your Groups',
        }}/>
      <Drawer.Screen
        name='Your Posts'
        options={{
          headerTitle: 'Your Posts',
        }}/>
      <Drawer.Screen
        name='favorites'
        options={{
          headerTitle: 'Favorites',
        }}/>
      <Drawer.Screen
        name='(de-escalation)'
        options={{
          headerShown: false,
        }}/>
      <Drawer.Screen
        name='settings'
        options={{
          headerTitle: 'Settings',
        }}/>
    </Drawer>
  )
}

export default UserLayout
