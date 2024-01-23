import { GestureResponderEvent, Pressable,  TextStyle, } from 'react-native'
import React, { ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'


type Props = {
  children: ReactNode
  styles?: TextStyle
  disabled?: boolean
  onPress: (event: GestureResponderEvent) => void
}


const DefaultPurpleButton = ({children, styles, disabled=false, onPress}: Props) => {
  return (
    <Pressable style={{width: '100%'}} onPress={onPress} disabled={disabled}>
      <LinearGradient
        start={{x: 0, y: 0.0}}
        end={{x: 1, y: 0.0}}
        colors={disabled ? ['#A09FA8', '#A09FA8'] : ['#514AA4', '#744696']}
        style={[{
          borderRadius:100,
          elevation: 5,
          paddingVertical: 14,
          paddingHorizontal: 24,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }, styles]}>
          {children}
      </LinearGradient>
    </Pressable>
  )
}

export default DefaultPurpleButton