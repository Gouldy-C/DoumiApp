import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { googleSignIn } from '@utils/auth/googleAuth';
import GoogleLogoSvg from './svg-components/googleLogoSvg';


const GoogleButton = () => {
  
  const handleGoogleSignIn = async () => {
    await googleSignIn()
  };
  
  return (
    <Pressable 
      style={{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center', 
        paddingVertical: 13,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 500,
        shadowColor: '#424052',
        elevation: 4,
        marginVertical: 20,
        borderColor: '#42405220',
        borderWidth: 1,
        gap: 16
      }}
      onPress={handleGoogleSignIn} 
    >
      <GoogleLogoSvg height={24} width={32} scale={0.50}/>
      <Text style={{fontSize: 19, fontWeight: '600'}}>Continue with Google</Text>
    </Pressable>
  )
}

export default GoogleButton
