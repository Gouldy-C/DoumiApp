import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DoumiOnboardingHeader from '@components/DoumiOnboardingHeader'
import ControlledTextInput from '@components/ControlledTextInput'
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DefaultPurpleButton from '@components/DefaultPurpleButton'
import { userStore } from '@utils/stores/userStore'
import { router } from 'expo-router'


interface FormData {
  username: string
};

const schema: ZodType<FormData> = z.object({
  username: z.string()
    .min(6)
    .max(30)
})

const OnboardingUsername = () => {
  const [submitError, setSubmitError] = useState('')
  const resetLoginInfo = userStore((state) => state.resetLoginInfo)
  const setUsername = userStore((state) => state.setUsername)

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  
  useEffect(() => {
    resetLoginInfo()
  }, [])
  
  const submitData = async (data: FormData ) => {
    Keyboard.dismiss()
    setSubmitError('')
    if (data.username){
      setUsername(data.username)
      router.push('/(auth)/onboardingProfilePic')
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-100} style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{paddingVertical: 76, width: '100%', alignItems: 'center'}}>
          <DoumiOnboardingHeader textValue="What would you like to be called?" textSize='large' />
          <Text style={{fontSize: 19, color: '#424052', textAlign: 'center' }}>We encourage anonymity on our platform, so everyone feels comfortable sharing their experience.</Text>
          <Text style={{fontSize: 19, color: '#424052', textAlign: 'center', marginVertical: 24}}>You can always change your username in the app.</Text>
            <View style={{alignItems: 'center', width: '100%', paddingVertical: 16}}>
              <ControlledTextInput
                keyboardType={'default'}
                control={control}
                placeholder={"Enter your preferred username"}
                name={"username"}
                label={"Username"}
                styles={{width: '100%'}}
              />
              <DefaultPurpleButton styles={{}} onPress={handleSubmit(submitData)} disabled={!isValid}>
                <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '700'}}>Continue</Text>
              </DefaultPurpleButton>
              <Text style={{color: 'red', fontSize:18, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}>{submitError}</Text>
            </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default OnboardingUsername