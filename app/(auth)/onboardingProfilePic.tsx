import { Pressable, ScrollView, Text, View } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import DoumiOnboardingHeader from '@components/DoumiOnboardingHeader'
import DefaultPurpleButton from '@components/DefaultPurpleButton'
import { userStore } from '@utils/stores/userStore'
import { profileImages } from '@constants/profileImages'


const onboardingProfilePic = () => {
  const setProfilePic = userStore((state) => state.setProfilePic)
  const profilePic = userStore((state) => state.loginInfo.profilePic)
  const username = userStore((state) => state.loginInfo.username)


  return (
    <ScrollView style={{}} contentContainerStyle={{paddingVertical: 76, width: '100%', alignItems: 'center', backgroundColor: '#ffffff', flex: 1, paddingHorizontal: 16}}>
      <DoumiOnboardingHeader textValue="What would you like to be called?" textSize='large' />
      <Text style={{fontSize: 19, color: '#424052', textAlign: 'center' }}>Pick an anonymous profile picture</Text>
      <Text style={{fontSize: 19, color: '#424052', textAlign: 'center', marginVertical: 24}}>You can always change it in the app.</Text>
        <View style={{alignItems: 'center', width: '100%', paddingVertical: 16}}>
          {profileImages.map((picUrl) => (
              <Pressable onPress={() => {}}>
                <Image
                  style={{height: 50, width: 50}}
                  source={picUrl}
                  placeholder={'Profile picture'}
                >

                </Image>
              </Pressable>
            ))
          }
          
          <DefaultPurpleButton styles={{}} onPress={() => {}} disabled={false}>
            <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '700'}}>Create Account</Text>
          </DefaultPurpleButton>
          <Text style={{color: 'red', fontSize:18, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}></Text>
        </View>
    </ScrollView>
  )
}

export default onboardingProfilePic