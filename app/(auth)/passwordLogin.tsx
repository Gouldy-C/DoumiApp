import { View, Text, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { ZodType, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DoumiOnboardingHeader from '@components/DoumiOnboardingHeader'
import DefaultPurpleButton from '@components/DefaultPurpleButton'
import ControlledTextInput from '@components/ControlledTextInput'
import { userStore } from '@utils/stores/userStore'
import { signInEmailPassword } from '@utils/auth/emailPasswordAuth'
import { router } from 'expo-router'



interface FormData {
  password: string
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
})

const passwordLogin = () => {
  const {loginInfo, setAuthUser} = userStore((state) => state)
  const [secureText, setSecureText] = useState(true)
  const [submitError, setSubmitError] = useState('')

  
  const {
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  
  const submitData = async (data: FormData ) => {
    console.log(loginInfo.email)
    Keyboard.dismiss()
    if(data.password && loginInfo.email){
      console.log('first')
      const res = await signInEmailPassword(loginInfo.email, data.password)
      if (typeof(res) === "string"){
        console.log('second')
        setSubmitError(res)
        return
      }
      console.log('third')
      setAuthUser(res.user)
      router.replace('/(user)/(feed)/userFeed')
    }
  }
  
  if(loginInfo.email === null) {
    router.replace('/(auth)/mainLogin')
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{paddingVertical: 76, flex: 1, width: '100%', alignItems: 'center'}}>
            <DoumiOnboardingHeader textValue="You're not alone in your dementia care journey." textSize='small' />
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
                <DefaultPurpleButton styles={{}} onPress={handleSubmit(submitData)}>
                  <Text style={{color: '#ffffff', fontSize: 18, fontWeight: '700'}}>Log in</Text>
                </DefaultPurpleButton>
                <Text style={{color: 'red', fontSize:18, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}>{submitError}</Text>
              </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default passwordLogin