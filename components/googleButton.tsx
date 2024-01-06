import React from 'react'
import { Pressable, Text } from 'react-native'
import { googleSignIn } from '@utils/auth/googleAuth';
import GoogleLogoSvg from './svg-components/googleLogoSvg';


const GoogleButton = ({buttonType} : {buttonType: 'in' | 'up'}) => {
  
  const handleGoogleSignIn = async () => {
    await googleSignIn()
  };
  
  return (
    <Pressable 
      style={{flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10, 
        width: '75%',
        alignSelf: 'center',
        borderColor: "black",
        borderWidth: 1.5,
        borderRadius: 10,
      }}
      onPress={handleGoogleSignIn} 
    >
      <GoogleLogoSvg height={36} width={36} scale={0.75}/>
      <Text style={{fontSize: 20, fontWeight: '500'}}>Sign {buttonType} with Google</Text>
    </Pressable>
  )
}

export default GoogleButton
