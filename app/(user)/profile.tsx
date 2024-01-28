import {Text, View, StyleSheet, Button, Image, TextInput, Pressable } from 'react-native'
import React from 'react'
import { logout } from '@utils/auth/general'
import UserPosts from '@components/UserPosts'
import DoumiImageLogo from "@components/svg-components/doumiImageLogo";
import { LinearGradient } from 'expo-linear-gradient';
import MagnifyingGlassSvg from '@components/svg-components/magnifyingGlassSvg'
import AccountGear from '@components/svg-components/accountGear';

const UserProfile = () => {
  return (
    <>
      <View style={{backgroundColor: 'white', paddingBottom: 20, paddingHorizontal: 16}}>
        <View style={{alignItems:'center', flexDirection: 'row', justifyContent: "space-between", marginVertical: 10}}>
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
        <View style={{alignSelf: 'center', alignItems:'center', flexDirection: 'row', gap: 10}}>
          <AccountGear width={35} height={38} color={'#734595'} scale={0.2}/>
          <Text style={{fontSize: 18, fontWeight: '500', color: '#734595'}}>Account Settings</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Pressable onPress={logout}><Text style={{fontSize: 17, fontWeight: '500', color: '#B50012'}}>Logout</Text></Pressable>
        </View>
      </View>
      <UserPosts/>
    </>
  )
}

export default UserProfile