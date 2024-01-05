import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import SignInForm from '@components/SignInForm';
import GoogleSignInButton from '@components/GoogleSignInButton';

const SignIn = () => {


  return (
    <ScrollView style={styles.safeView}>

      <SignInForm/>

      <GoogleSignInButton/>

    </ScrollView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  
})