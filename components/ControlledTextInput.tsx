import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

type ControlledInputProps = {
  control: Control<any>,
  name: string,
  placeholder: string,
  label: string,
  secureTextEntry?: boolean
}

const ControlledTextInput = ({control, placeholder, name, label, secureTextEntry = false}: ControlledInputProps ) => {
  return (
    <Controller        
        control={control}        
        name={name}        
        render={({field: {value, onChange,  onBlur}, fieldState: {error, invalid}}) => (
          <>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}/>
            {error?.message && <Text style={styles.inputError}>{error.message}</Text>}
          </>
        )}
      />
  )
}

export default ControlledTextInput

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  inputError: {
    color: 'red',
    marginTop: 4,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})