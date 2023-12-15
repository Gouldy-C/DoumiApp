import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SignUp = () => {
  return (
    <View style={styles.safeView}>
      <Text>Sign Up</Text>
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