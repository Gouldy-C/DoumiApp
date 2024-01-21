import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import BackArrowSvg from './svg-components/backArrowSvg'
import { router } from 'expo-router'

type ControlledInputProps = {
  control: Control<any>,
  name: string,
  placeholder: string,
  label: string,
  secureTextEntry?: boolean
}

const ControlledTextInput = ({ control, placeholder, name, label, secureTextEntry = false}: ControlledInputProps ) => {
  return (
    <Controller
      control={control}        
      name={name}        
      render={({field: {value, onChange,  onBlur}, fieldState: {error, invalid}}) => (
        <>
        <View style={{flexDirection: 'row', gap: 12, paddingHorizontal: 12, paddingVertical: 12, alignItems: 'center', flexGrow: 0}}>
          <Pressable onPress={() => router.push('/(user)/(feed)/userFeed')}>
            <BackArrowSvg height={20} width={10} scale={0.95} color={'grey'}/>
          </Pressable>
          <Text style={style.inputLabel}>{label}</Text>
        </View>
          <TextInput
            style={[style.input]}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}/>
          {error?.message && <Text style={style.inputError}>{error.message}</Text>}
        </>
      )}
    />
  )
}

export default ControlledTextInput

const style = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: "75%",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  inputError: {
    color: 'red',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 33,
  }
})