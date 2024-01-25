import { Keyboard, Pressable, ScrollView, Text, View } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import DoumiOnboardingHeader from '@components/DoumiOnboardingHeader'
import DefaultPurpleButton from '@components/DefaultPurpleButton'
import { userStore } from '@utils/stores/userStore'
import { profileImages } from '@constants/profileImages'
import { createNewUserFirestore } from '@utils/firestore/firestoreFunctions';
import auth from '@react-native-firebase/auth'
import { router } from 'expo-router';



const onboardingProfilePic = () => {
  const setProfilePic = userStore((state) => state.setProfilePic)
  const profilePic = userStore((state) => state.loginInfo.profilePic)
  const username = userStore((state) => state.loginInfo.username)

  const submitData = async () => {
    Keyboard.dismiss()
    const user = auth().currentUser
    if (username && profilePic && user) {
      await createNewUserFirestore(user, username, profilePic)
      router.replace('/')
    }
  };

  return (
    <ScrollView style={{}} contentContainerStyle={{paddingVertical: 76, width: '100%', alignItems: 'center', backgroundColor: '#ffffff', flex: 1, paddingHorizontal: 16}}>
      <DoumiOnboardingHeader textValue="What would you like to be called?" textSize='large' />
      <Text style={{fontSize: 19, color: '#424052', textAlign: 'center' }}>Pick an anonymous profile picture</Text>
      <Text style={{fontSize: 19, color: '#424052', textAlign: 'center', marginTop: 24}}>You can always change it in the app.</Text>
      <View style={{alignItems: 'center', width: '100%', paddingVertical: 16, }}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24, gap: 5, justifyContent: 'center'}}>
          {profileImages.map((picUrl) => (
              <Pressable 
                key={picUrl} 
                onPress={() => {setProfilePic(picUrl)}}
                style={{paddingHorizontal: 5, paddingVertical:5, backgroundColor: profilePic === picUrl ? '#80808080' : '#ffffff', borderRadius: 15}}
              >
                <Image
                  style={{height: 70, width: 70}}
                  source={picUrl}
                  placeholder={'Profile picture'}
                />
              </Pressable>
            ))
          }
        </View>
        
        <DefaultPurpleButton styles={{}} onPress={submitData} disabled={!profilePic}>
          <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '700'}}>Create Account</Text>
        </DefaultPurpleButton>
        <Text style={{color: 'red', fontSize:18, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}></Text>
      </View>
    </ScrollView>
  )
}

export default onboardingProfilePic