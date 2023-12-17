import React from 'react'
import Drawer from 'expo-router/drawer'
import AuthDrawer from '../../components/AuthDrawer'
import { userStore } from '@utils/stores/userStore'
import { Redirect } from 'expo-router'

const AuthLayout = () => {
  const {user} = userStore((state) => state)
  
  if (user){
    return <Redirect href={'/(user)/feed'}/>
  }

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
