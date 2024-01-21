import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

type ControlledInputProps = {
  control: Control<any>,
  name: string,
  placeholder: string,
  label?: string,
  secureTextEntry?: boolean,
  styles?: TextStyle
  multiline?: boolean
}

const ControlledTextInput = ({multiline = false, styles, control, placeholder, name, label, secureTextEntry = false}: ControlledInputProps ) => {
  return (
    <Controller
      control={control}        
      name={name}        
      render={({field: {value, onChange,  onBlur}, fieldState: {error, invalid}}) => (
        <>
          {label && <Text style={style.inputLabel}>{label}</Text>}
          <TextInput
            multiline={multiline}
            style={[style.input, styles]}
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
    padding: 5,
    borderRadius: 5,
    fontSize: 18,
    elevation: 6,
  },
  inputError: {
    color: 'red',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 33,
  }
})