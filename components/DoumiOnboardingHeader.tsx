import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DoumiTextLogo from './svg-components/doumiTextLogo'

const DoumiOnboardingHeader = ({textValue, textSize}: {textValue: string, textSize: 'small' | 'large'}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 30}}>
      <DoumiTextLogo scale={2} height={49} width={150}/>
      <Text style={{fontSize: textSize === 'small' ? 20 : 28, textAlign: 'center', textAlignVertical: 'center', color: '#5049A4', lineHeight: 24.2, paddingHorizontal:textSize === 'small' ? 35 : 10}}>{textValue}</Text>
    </View>
  )
}

export default DoumiOnboardingHeader