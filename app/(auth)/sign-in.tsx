import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { googleSignIn } from '@utils/functions/googleFunctions';

const SignIn = () => {
  return (
    <View style={styles.safeView}>
      <Text>Sign In</Text>
      <Link href={'/(user)/feed'}>To User Home</Link>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => googleSignIn()}/>;
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