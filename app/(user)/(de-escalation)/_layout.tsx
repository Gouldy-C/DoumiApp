import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'


const DeEscalationLayout = () => {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name='de-escalation'
        options={{
          title: 'De Escalation',
          headerTitle: 'De Escalation'
        }}/>
      <Stack.Screen
        name='de-escalation-favorites'
        options={{
          title: 'Favorites',
          headerTitle: 'De Escalation'
        }}/>
    </Stack>
  )
}

export default DeEscalationLayout

const styles = StyleSheet.create({
  tabText:{
    fontSize: 12
  }
})