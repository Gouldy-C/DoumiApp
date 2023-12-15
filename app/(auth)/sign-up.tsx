import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SignUpForm from '@components/SignUpForm'

const SignUp = () => {
  return (
    <View style={styles.safeView}>
      <Text>Sign Up</Text>
      <SignUpForm/>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})