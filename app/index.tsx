import {StyleSheet} from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'


const AppEntry = () => {
  return (
    <Redirect href={"/sign-up"}/>
  )
}

export default AppEntry

const styles = StyleSheet.create({
})