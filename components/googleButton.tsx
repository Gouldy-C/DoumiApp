import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { googleSignIn } from '@utils/auth/googleAuth';
import GoogleLogoSvg from './svg-components/googleLogoSvg';


const GoogleButton = ({buttonType} : {buttonType: 'in' | 'up'}) => {
  
  const handleGoogleSignIn = async () => {
    await googleSignIn()
  };
  
  return (
      <Pressable 
        style={{
          flexDirection: 'row', 
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: 10, 
          width: '75%',
          alignSelf: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          shadowColor: '#000000',
          elevation: 5,
          margin: 12,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onPress={handleGoogleSignIn} 
      >
        <GoogleLogoSvg height={36} width={36} scale={0.75}/>
        <Text style={{fontSize: 20, fontWeight: '500'}}>Sign {buttonType} with Google</Text>
      </Pressable>
  )
}

export default GoogleButton
