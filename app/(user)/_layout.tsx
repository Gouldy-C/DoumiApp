import React from 'react'
import Drawer from 'expo-router/drawer'
import UserDrawer from '../../components/UserDrawer'

const UserLayout = () => {
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
