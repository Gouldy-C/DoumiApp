import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <View style={styles.safeView}>
      <Text>Sign In</Text>
      <Link href={'/(user)/feed'}>To User Home</Link>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})