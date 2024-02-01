import {Text, 
  View,
  Pressable, 
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import CloseXSvg from './svg-components/closeXSvg'
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { searchableHashtags } from '@constants/hashtagSearch/hashtagData';
import DoumiTextLogo from './svg-components/doumiTextLogo'
import { useFonts } from 'expo-font';


const SelectHashTagsModal = ({buttonText, body, state, setModalVisible, tagData, setModalReturn}: {
  buttonText: string,
  body?: string, 
  state: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  tagData: string[],
  setModalReturn: React.Dispatch<React.SetStateAction<string[]>> | ((newSearch: string[]) => void),
}) => {
  const [hashTagArray, setHashTagArray] = useState<string[]>([...tagData])
  const [search, setSearch] = useState('')
  const inputRef = useRef<TextInput>(null);


  const closeModal = () => {
    setModalVisible(false)
    setHashTagArray([...tagData])
    setSearch('')
  }

  const selectHashTag = (tag: string) => {
    if (hashTagArray.includes(tag)) {
      setHashTagArray(hashTagArray.filter((x) => x !== tag))
    }
    else {
      setHashTagArray((prev) => [...prev, tag])
    }
  }

  const confirmModal = () => {
    setModalReturn(hashTagArray)
    setModalVisible(false);
    setSearch('')
  };


  useEffect(() => {
    setHashTagArray([...tagData])
  }, [tagData])
  

  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
    VerdanaBold: require('../assets/fonts/verdana-bold.ttf'),
    Verdana: require('../assets/fonts/verdana.ttf'),
    InterSemibold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });


  if (error) {
    console.error('Font loading error:', error);
  }
  
  if (!loaded) {
    return null; 
  }
  
  return (
    <Modal
      animationType='fade'
      transparent={false}
      visible={state}
      onRequestClose={()=> setModalVisible(false)}
      style={{width: '100%', height: '100%', paddingHorizontal:16, paddingVertical: 12, backgroundColor: '#ffffff'}}
    >
      <View
        style={{alignItems: 'center', flexDirection: 'row'}}
      >
        <Pressable onPress={closeModal} style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <CloseXSvg height={22} width={22} color={'#424052'} scale={1}/>
        </Pressable>
        <View
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
        >
          <DoumiTextLogo height={28} width={140} scale={1.1}/>
        </View>
      </View>
      <LinearGradient
        start={{x: 0, y: 0.0}}
        end={{x: 1, y: 0.0}}
        colors={['#E6E4FF', '#D9E5FF']}
        style={{
          elevation: 5,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
          }}>
        <TextInput
          ref={inputRef}
          placeholder={"Search for tags..."}
          style={{fontSize: 18, color: '#6D6B82', paddingVertical: 10, maxWidth: '83%', paddingHorizontal: 20}}
          onChangeText={setSearch}
          />
        {search && 
          <Pressable onPress={() => {setSearch(''); inputRef.current?.clear()}} style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <CloseXSvg height={18} width={18} color={'#6D6B82'} scale={0.8}/>
          </Pressable>
        }
      </LinearGradient>

      {body && <Text style={{textAlign: 'center', paddingVertical: 5, paddingHorizontal: 20, fontWeight: '400', fontSize: 18, color: '#424052'}}>{body}</Text>}

      <ScrollView 
        contentContainerStyle={{gap: 12, paddingHorizontal: 16, paddingVertical: 16}}
      >
        {searchableHashtags.filter((x) => search !== '' ? x.toLowerCase().includes(search.toLowerCase().trim()) : true).map((hashTag, index) => (
          <Pressable
          key={index}
          onPress={() => selectHashTag(hashTag)}
          style={{ flexDirection: 'row', flexGrow: 0, alignItems: 'center'}}
          >
            <Checkbox style={{marginHorizontal: 15, marginVertical: 7}} color={'#2B789D'} value={hashTagArray.includes(hashTag)} onValueChange={() => selectHashTag(hashTag)} />
            <Text
              style={{color: '#2B789D', fontWeight: 'bold', fontSize: 16, fontFamily: 'Verdana'}}
            >
              {hashTag}
            </Text>
          </Pressable>
        ))
        }
      </ScrollView>
      <Pressable  onPress={confirmModal}>
          <LinearGradient
            start={{x: 0, y: 0.0}}
            end={{x: 1, y: 0.0}}
            colors={['#514AA4', '#744696']}
            style={{
                marginVertical: 20,
                marginHorizontal: 20,
                borderRadius: 60,
                elevation: 5,
                paddingVertical: 10,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontFamily: 'InterSemibold', textAlign: 'center', fontSize: 18, color: 'white', marginLeft: 15}}>{buttonText}</Text>
              </View>
          </LinearGradient>
        </Pressable>
    </Modal>
  )
}

export default SelectHashTagsModal