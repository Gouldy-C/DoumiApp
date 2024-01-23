import { Keyboard, KeyboardAvoidingView, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GoogleButton from '@components/GoogleButton'
import DoumiOnboardingHeader from '@components/DoumiOnboardingHeader'
import ControlledTextInput from '@components/ControlledTextInput'
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DefaultPurpleButton from '@components/DefaultPurpleButton'
import { LinearGradient } from 'expo-linear-gradient'
import { userStore } from '@utils/stores/userStore'
import auth from '@react-native-firebase/auth'
import { router } from 'expo-router'


interface FormData {
  email: string
};

const schema: ZodType<FormData> = z.object({
  email: z.string().email("Invalid Email"),
})

const mainLogin = () => {
  const [emailLogin, setEmailLogin] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const {setLoginEmail, resetLoginInfo} = userStore((state) => state)
  
  const {
    control,
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
    resetLoginInfo()

    if (data.email){
      await auth().fetchSignInMethodsForEmail(data.email)
        .then((methods) => {
          if  (methods.includes('google.com')) {
            setSubmitError('This email address is already registered via Google sign in!')
          }
          else if (methods.includes('password')) {
            setLoginEmail(data.email)
            router.push('/(auth)/passwordLogin')
          }
          else if (methods.length === 0) {
            setLoginEmail(data.email)
            router.push('/(auth)/onboardingPassword')
          }
        })
        .catch((error) => console.error(error))
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 16}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{paddingVertical: 60, flex: 1, width: '100%', alignItems: 'center'}}>
            <DoumiOnboardingHeader textValue="You're not alone in your dementia care journey." textSize='small' />
            <GoogleButton/>
            <View style={{backgroundColor: '#CFCFD3', width: '100%', height: 2, marginVertical: 25 }}/>
            {!emailLogin ?
              <Pressable 
                style={{
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'center', 
                  paddingVertical: 9,
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: 500,
                }}
                onPress={() => {setEmailLogin((prev) => !prev)}}>
                <Text style={{fontSize: 19, fontWeight: '600', color: '#5049A4', marginVertical: 30}}>Continue with email</Text>
              </Pressable>
              :
              <View style={{alignItems: 'center', width: '100%'}}>
                <ControlledTextInput
                  keyboardType={'email-address'}
                  control={control}
                  placeholder={"Enter your email address"}
                  name={"email"}
                  label={"Email Address"}
                  styles={{width: '100%'}}
                />
                <DefaultPurpleButton styles={{}} onPress={handleSubmit(submitData)}>
                  <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '700'}}>Continue</Text>
                </DefaultPurpleButton>
                <Text style={{color: 'red', fontSize:18, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}>{submitError}</Text>
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {!emailLogin &&
        <LinearGradient
        start={{x: 0, y: 0.0}}
        end={{x: 1, y: 0.0}}
        colors={['#514AA4', '#744696']}
        style={{
          height: '25%',
          width: '100%',
        }}/>}
    </>
  )
}

export default mainLogin