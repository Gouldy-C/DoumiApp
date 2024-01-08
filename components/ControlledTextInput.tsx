import { StyleSheet, Text, TextInput } from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

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
          <Text style={style.inputLabel}>{label}</Text>
          <TextInput
            style={style.input}
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
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    elevation: 15,
  },
  inputError: {
    color: 'red',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})