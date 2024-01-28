import { KeyboardType, KeyboardTypeIOS, StyleSheet, Text, TextInput, View} from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

interface Props {
  control: Control<FormValues, any>
  name: string
  placeholder: string
  label?: string
  secureTextEntry?: boolean
  styles?: TextStyle
  multiline?: boolean
  keyboardType: KeyboardType | "visible-password" | KeyboardTypeIOS
}

const ControlledTextInput = ({multiline = false, styles, control, placeholder, name, label, secureTextEntry = false, keyboardType}: Props ) => {
  return (
    <View style={{width: '100%'}}>
      <Controller
        name={name}        
        control={control}        
        render={({field: {value, onChange,  onBlur}, fieldState: {error}}) => (
            <>
              <TextInput
                keyboardType={keyboardType}
                multiline={multiline}
                style={[style.input, styles, error?.message ? {borderColor: '#ff0000', backgroundColor: '#ff00000D'} : {}]}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}/>
              {label && <Text style={style.inputLabel}>{label}</Text>}
              {error && <Text style={[style.inputError]}>{error?.message}</Text>}
            </>
          )}
        />
    </View>
  )
}

export default ControlledTextInput

const style = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 2,
    paddingHorizontal:16,
    paddingVertical: 11,
    borderColor: '#6D6B82',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 19,
    position: 'relative',
  },
  inputError: {
    color: 'red',
    marginBottom: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: '400'
  },
  inputLabel: {
    backgroundColor: '#ffffff',
    fontSize: 14,
    position: 'absolute',
    paddingHorizontal: 5,
    top: 0,
    left: 16,
    borderRadius: 3,
  }
})