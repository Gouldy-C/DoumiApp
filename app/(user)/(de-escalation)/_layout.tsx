import React from 'react'
import { Tabs } from 'expo-router'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'


const DeEscalationLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton tintColor='#000000'/>
      }}>
      <Tabs.Screen
      
        name='de-escalation'
        options={{
          tabBarIcon: () => <AntDesign name='checkcircleo' size={20}/>,
          title: 'De Escalation',
          headerTitle: 'De Escalation'
        }}/>
      <Tabs.Screen
        name='de-escalation-favorites'
        options={{
          tabBarIcon: () => <AntDesign name='staro' size={20}/>,
          title: 'Favorites',
          headerTitle: 'De Escalation'
        }}/>
    </Tabs>
  )
}

export default DeEscalationLayout

const styles = StyleSheet.create({
  tabText:{
    fontSize: 12
  }
})