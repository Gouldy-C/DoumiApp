import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import SignUpForm from '@components/SignUpForm'
import GoogleSignInButton from '@components/GoogleSignInButton'

const SignUp = () => {
  return (
    <ScrollView style={styles.safeView}>
      
      <SignUpForm/>

      <GoogleSignInButton/>
    </ScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  }
})