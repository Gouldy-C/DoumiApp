import {Text, View, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { handlePost } from '@utils/posting/functions';
import { router } from 'expo-router';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextInput from '@components/ControlledTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import PublishArrowSvg from '@components/svg-components/publishArrowSvg';
import BackArrowSvg from '@components/svg-components/backArrowSvg';
import CheckListSvg from '@components/svg-components/checkListSvg';
import SelectHashTagsModal from '@components/SelectHashTagsModal';
import DefaultPurpleButton from '@components/DefaultPurpleButton';
import { useFonts } from 'expo-font';

type FormData = {
  post: string;
};

const NewPost = () => {
  const [selectedTags, setSelectedTags] =  useState<string[]>([])
  const [modalVisible, setModalVisible] = useState(false);
  const schema: ZodType<FormData> = z.object({
    post: z
    .string()
    .min(5, "Post must be longer then 5 characters")
    .max(1000,"Post must be less then 1000 characters")
  });
  const isTags = !!selectedTags.length

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const resetPost = () => {
    reset()
    setSelectedTags([])
  }

  const submitData = async (data: FormData) => {
    if (isTags) {
      handlePost(data.post, selectedTags)
      reset()
      setSelectedTags([])
      router.push('/(user)/(feed)/userFeed')
    }
  }


  
  const [loaded, error] = useFonts({
    Inter: require('../../assets/fonts/Inter-Medium.ttf'),
    VerdanaBold: require('../../assets/fonts/verdana-bold.ttf'),
    Verdana: require('../../assets/fonts/verdana.ttf'),
    InterSemibold: require('../../assets/fonts/Inter-SemiBold.ttf'),
  });


  if (error) {
    console.error('Font loading error:', error);
  }
  
  if (!loaded) {
    return null; 
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16}}>
      <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
        <Pressable onPress={() => {router.back()}} style={{paddingRight: 25,}}>
          <BackArrowSvg height={24} width={20} color={'#424052'} scale={1.2}/>
        </Pressable>
        <Text style={{fontSize: 32, fontWeight: '500', fontFamily: "Inter"}}>New Post</Text>
        <Pressable onPress={resetPost} style={{marginLeft: 'auto', borderRadius: 60,
          elevation: 6,
          paddingVertical: 8,
          paddingHorizontal: 20,
          backgroundColor: '#ffffff'
        }}>
          <Text style={{fontSize: 18}}>Clear</Text>
        </Pressable>
      </View>
      <View style={{flex: 1, gap: 40}}>
        <View style={{flex: 1}}>
          <ControlledTextInput
            keyboardType={'default'}
            control={control}
            placeholder={"Write something..."}
            name={"post"}
            styles={{elevation: 0, borderWidth: 0, textAlignVertical: 'top', paddingVertical: 0, paddingHorizontal: 10, marginVertical: 0}}
            multiline />
        </View>
        <ScrollView style={{flexGrow: 0, maxHeight: 90, marginBottom: 10}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
          {selectedTags.length !== 0 &&
            selectedTags.map((tag) => (
                <Text key={tag} style={{color: '#2B789D', fontWeight: '700', fontSize: 16}}>{tag}</Text>
              ))
          }
        </ScrollView>
      </View>
      <View style={{}}>
        <Pressable
          onPress={()=> setModalVisible((prev) => !prev)}
          style={{marginVertical: 5, flexDirection: 'row', width: 175, marginRight: 100}}
          >
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 10, paddingHorizontal:16, paddingVertical: 10, backgroundColor: '#2B789D'}}
            >
            <CheckListSvg height={17} width={22} color={'#ffffff'} scale={1.1}/>
            <Text
              style={{fontWeight: 'bold', fontSize: 16, color: 'white', fontFamily: 'Verdana'}}
              >
              Add/Remove a Tag
            </Text>
          </View>
          <View
            style={{width: 33.5 ,backgroundColor: '#2B789D', aspectRatio: 1, borderRadius: 7, transform: [{rotate: '-45deg'}, {translateX: -20.4}, {translateY: -14.7}], zIndex: -5}}
            />
        </Pressable>
        <DefaultPurpleButton styles={{paddingVertical: 10, marginVertical: 25}} onPress={handleSubmit(submitData)} disabled={isTags ? isValid ? false : true : true }>
          <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', marginRight: 15, fontFamily: 'InterSemibold'}}>Publish</Text>
          <PublishArrowSvg color='white' height={14} width={16}/>
        </DefaultPurpleButton>
      </View>

      <SelectHashTagsModal 
        buttonText={'Update Post'}
        body={'Add or remove tags from your post, so others can easily find it.'}
        state={modalVisible}
        setModalVisible={setModalVisible}
        tagData={selectedTags}
        setModalReturn={setSelectedTags} />
    </KeyboardAvoidingView>
  )
}

export default NewPost
