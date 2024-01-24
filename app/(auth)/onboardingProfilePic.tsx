import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import DoumiOnboardingHeader from '@components/DoumiOnboardingHeader'
import DefaultPurpleButton from '@components/DefaultPurpleButton'
import { userStore } from '@utils/stores/userStore'
import storage from '@react-native-firebase/storage'

const ref = storage().ref('gs://caretaker-app-colab25.appspot.com/Profile_Images/butterfly.png')

const onboardingProfilePic = () => {
  const setProfilePic = userStore((state) => state.setProfilePic)
  const profilePic = userStore((state) => state.loginInfo.profilePic)
  const username = userStore((state) => state.loginInfo.username)


  return (
    <ScrollView style={{}} contentContainerStyle={{paddingVertical: 76, width: '100%', alignItems: 'center', backgroundColor: '#ffffff', flex: 1}}>
      <DoumiOnboardingHeader textValue="What would you like to be called?" textSize='large' />
      <Text style={{fontSize: 19, color: '#424052', textAlign: 'center' }}>Pick an anonymous profile picture</Text>
      <Text style={{fontSize: 19, color: '#424052', textAlign: 'center', marginVertical: 24}}>You can always change it in the app.</Text>
        <View style={{alignItems: 'center', width: '100%', paddingVertical: 16}}>
          
          <DefaultPurpleButton styles={{}} onPress={() => {}} disabled={false}>
            <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '700'}}>Create Account</Text>
          </DefaultPurpleButton>
          <Text style={{color: 'red', fontSize:18, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}></Text>
        </View>
    </ScrollView>
  )
}

export default onboardingProfilePic