import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { googleSignIn, googleSignOut } from '../../utils/functions/googleAuth';

const SignIn = () => {
  return (
    <View style={styles.safeView}>
      <Text>Sign In</Text>
      <Link href={'/(user)/feed'}>To User Home</Link>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}/>; */}
        <Pressable
          onPress={() => googleSignIn()}>
          <Text style={styles.google}>Google</Text>
        </Pressable>
        <Pressable
          onPress={() => googleSignOut()}>
          <Text style={styles.google}>Sign Out</Text>
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

  }
})