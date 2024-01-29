import {Text, View, StyleSheet, Button, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { logout } from '@utils/auth/general'
import UserPosts from '@components/UserPosts'
import DoumiImageLogo from "@components/svg-components/doumiImageLogo";
import { LinearGradient } from 'expo-linear-gradient';
import MagnifyingGlassSvg from '@components/svg-components/magnifyingGlassSvg'
import AccountGear from '@components/svg-components/accountGear';
import SelectHashTagsModal from '@components/SelectHashTagsModal';
import { searchStore } from '@utils/stores/searchStore';

const UserProfile = () => {
  const search = searchStore((state) => state.search)
  const setSearch = searchStore((state) => state.setSearch)
  const [modalVisible, setModalVisible] = useState(false);

  
  return (
    <>
      <View style={{backgroundColor: 'white', paddingBottom: 8, paddingHorizontal: 12}}>
        <View style={{alignItems:'center', flexDirection: 'row', justifyContent: "space-between", marginVertical: 8}}>
          <DoumiImageLogo color='white' height={50} width={50} />
          <Text style={{fontSize: 32, fontWeight: '500'}}>Profile</Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <LinearGradient
              start={{x: 0, y: 0.0}}
              end={{x: 1, y: 0.0}}
              colors={['#734595', '#4858A7']}
              style={{ alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius:50}}
            >
              <MagnifyingGlassSvg width={27} height={27} scale={1} fill="#FFFFFF" />
            </LinearGradient>
          </Pressable>
        </View>
        <View style={{alignSelf: 'center', alignItems:'center', flexDirection: 'row', gap: 10}}>
          <AccountGear width={30} height={26} color={'#734595'} scale={0.7} fill={"#5049A4"}/>
          <Text style={{fontSize: 18, fontWeight: '500', color: '#734595'}}>Account Settings</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Pressable onPress={logout}><Text style={{fontSize: 17, fontWeight: '500', color: '#B50012', paddingVertical: 10}}>Logout</Text></Pressable>
        </View>
      </View>
      <UserPosts/>
      <SelectHashTagsModal 
      buttonText={'Search Tags'}
      body={'Add or remove tags from your search'}
      state={modalVisible}
      setModalVisible={setModalVisible}
      tagData={search}
      setModalReturn={setSearch} />
    </>
  )
}

export default UserProfile