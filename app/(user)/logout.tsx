import { StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { googleSignOut } from '@utils/functions/googleAuth'
import { Redirect } from 'expo-router'
import { userStore } from '@utils/stores/userStore'

const UserLogout = () => {
  const {setUser} = userStore((state) => state)

  useEffect(() => {
    googleSignOut()
    setUser(null)
  }, [])
  
  
  return (
    <Redirect href={'/'}/>
  )
}

export default UserLogout

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})