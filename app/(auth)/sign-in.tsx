import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { googleSignIn } from '@utils/functions/googleAuth';
import { userStore } from '@utils/stores/userStore';
import auth from '@react-native-firebase/auth'
import SignInForm from '@components/SignInForm';

const SignIn = () => {
  const {setUser} = userStore((state) => state)
  const handleGoogleSignIn = async () => {
    await googleSignIn()
    setUser(auth().currentUser)
    router.replace('/(user)/feed')
  }


  return (
    <View style={styles.safeView}>
      <Text>Sign In</Text>
      <SignInForm/>
      <Link href={'/(user)/feed'}>To User Home</Link>
        <Pressable
          onPress={handleGoogleSignIn}>
          <Text style={styles.google}>Google</Text>
        </Pressable>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  google: {
    fontSize: 22,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 15,
    margin: 15,

  }
})