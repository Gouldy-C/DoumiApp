import {Text, View, StyleSheet, Button, Image, TextInput } from 'react-native'
import React from 'react'
import { logout } from '@utils/auth/general'
import UserPosts from '@components/UserPosts'
import DoumiImageLogo from "@components/svg-components/doumiImageLogo";
import { LinearGradient } from 'expo-linear-gradient';
import MagnifyingGlassSvg from '@components/svg-components/magnifyingGlassSvg'

const UserProfile = () => {
  return (
    <>
      <View style={{backgroundColor: 'white', paddingBottom: 20, }}>
        <View style={{alignItems:'center', flexDirection: 'row', justifyContent: "space-around", marginVertical: 10}}>
          <DoumiImageLogo color='white' height={50} width={50} />
          <Text style={{fontSize: 32, fontWeight: '500'}}>Profile</Text>
          <LinearGradient
                start={{x: 0, y: 0.0}}
                end={{x: 1, y: 0.0}}
                colors={['#734595', '#4858A7']}
                style={{width: '12%', aspectRatio:1, alignItems: 'center', justifyContent: 'center', borderRadius: 15}}
          >
          <MagnifyingGlassSvg width={30} height={30} scale={0.5} fill="#FFFFFF" stroke="#FFFFFF" />
          </LinearGradient>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '500', color: '#734595'}}>Account Settings</Text>
        </View>
      </View>
      <UserPosts/>
    </>
  )
}

export default UserProfile