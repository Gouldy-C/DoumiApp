import { View, Text, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ZodType, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DoumiOnboardingHeader from '@components/DoumiOnboardingHeader'
import DefaultPurpleButton from '@components/DefaultPurpleButton'
import ControlledTextInput from '@components/ControlledTextInput'
import { userStore } from '@utils/stores/userStore'
import { signUpEmailPassword } from '@utils/auth/emailPasswordAuth'
import { router } from 'expo-router'



interface FormData {
  password: string
  confirmPassword: string;
};


const lowercaseRe = new RegExp(`[a-z]`);
const uppercaseRe = new RegExp(`[A-Z]`);
const numberRe = new RegExp(`[0-9]`);
const specialRe = new RegExp(`[!#$%&*+-.:;<=>?@^_]`);

const schema: ZodType<FormData> = z.object({
  password: z
      .string()
      .min(8)
      .max(64)
      .regex(lowercaseRe, "Must contain a lowercase letter.")
      .regex(uppercaseRe, "Must contain a uppercase letter.")
      .regex(numberRe, "Must contain a number.")
      .regex(specialRe, "Must contain a special character."),
      confirmPassword: z.string().min(8).max(20),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const OnboardingPassword = () => {
  const email = userStore((state) => state.loginInfo.email)
  const [secureText, setSecureText] = useState(true)
  const [submitError, setSubmitError] = useState('')
  const setUserDoc = userStore((state) => state.setUserDoc)

  
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  
  const submitData = async (data: FormData ) => {
    Keyboard.dismiss()
    setUserDoc(null)
    if(data.password && email){
      const res = await signUpEmailPassword(email, data.password)
      if (typeof(res) === "string"){
        setSubmitError(res)
      }
    }
  }
  
  if(email === null) {
    router.replace('/(auth)/mainLogin')
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-100} style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{paddingVertical: 76, width: '100%', alignItems: 'center'}}>
            <DoumiOnboardingHeader textValue="Select Account Password" textSize='large' />
            <Text style={{color: '#424052', fontSize:20, textAlign: 'center', paddingVertical: 20, paddingHorizontal: 20}}>{email}</Text>
              <View style={{alignItems: 'center', width: '100%'}}>
                <ControlledTextInput
                  keyboardType={'default'}
                  control={control}
                  placeholder={"Enter your password"}
                  name={"password"}
                  label={"Password"}
                  styles={{width: '100%'}}
                  secureTextEntry={secureText}
                />
                <ControlledTextInput
                  keyboardType={'default'}
                  control={control}
                  placeholder={"Password"}
                  name={"confirmPassword"}
                  label={"Confirm Password"}
                  styles={{width: '100%'}}
                  secureTextEntry={secureText}
                />
                <DefaultPurpleButton styles={{}} onPress={handleSubmit(submitData)} disabled={!isValid}>
                  <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '700'}}>Sign Up</Text>
                </DefaultPurpleButton>
                <Text style={{color: 'red', fontSize:18, textAlign: 'center', paddingVertical: 20, paddingHorizontal: 20}}>{submitError}</Text>
              </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default OnboardingPassword