import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import SignUpForm from '@components/SignUpForm'
import GoogleButtonSvg from '@components/svg-components/googleButton'

const SignUp = () => {
  return (
    <ScrollView style={styles.safeView}>
      
      <SignUpForm/>

      <GoogleButtonSvg buttonType='up'/>

    </ScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  }
})