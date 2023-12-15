import React from 'react'
import Drawer from 'expo-router/drawer'
import AuthDrawer from '../../components/AuthDrawer'

const AuthLayout = () => {
  return (
    <Drawer drawerContent={(props) => <AuthDrawer {...props}/>}>
      <Drawer.Screen
        name='sign-in'
        options={{
          headerTitle: 'Sign In',
        }}/>
      <Drawer.Screen
        name='sign-up'
        options={{
          headerTitle: 'Sign Up',
        }}/>
    </Drawer>
  )
}

export default AuthLayout
