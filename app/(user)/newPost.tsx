import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native'
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


type FormData = {
  post: string;
};

const NewPost = () => {
  const [selectedTags, setSelectedTags] =  useState<string[]>([])
  const [modalVisible, setModalVisible] = useState(false);
  const schema: ZodType<FormData> = z.object({
    post: z
      .string()
      .min(2, "Post must be longer then 2 characters")
      .max(1000,"Post must be less then 1000 characters")
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const resetPost = () => {
    reset()
    setSelectedTags([])
  }

  const submitData = async (data: FormData) => {
    handlePost(data.post, selectedTags)
    router.push('/(user)/(feed)/userFeed')
    setSelectedTags([])
    reset({ post: "" })
  }
  

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginRight: 20}}>
        <Pressable onPress={() => {router.back()}} style={{paddingHorizontal:22, paddingVertical: 10,}}>
          <BackArrowSvg height={24} width={20} color={'#424052'} scale={1.2}/>
        </Pressable>
        <Text style={{fontSize: 32, fontWeight: '500'}}>New Post</Text>
        <Pressable onPress={resetPost} style={{marginLeft: 'auto'}}>
          <LinearGradient
          start={{x: 0, y: 0.0}}
          end={{x: 1, y: 0.0}}
          colors={['#E6E4FF', '#D9E5FF']}
          style={{
            borderRadius: 60,
            elevation: 5,
            paddingVertical: 8,
            paddingHorizontal: 20,
            }}>
              <Text style={{fontSize: 18}}>Clear Post</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <View style={{flex: 1, backgroundColor: 'white',
          alignSelf: "center",width: '100%'}}>
        <View style={{backgroundColor: 'white', borderRadius: 8, justifyContent: 'space-between', alignSelf: "center", width: '90%', paddingVertical: 5, paddingHorizontal: 16, marginVertical: 5, flex: 1, overflow: 'hidden'}}>
          <ControlledTextInput
            control={control}
            placeholder={"Write something..."}
            name={"post"}
            styles={{textAlignVertical: 'top', flex: 1,  borderWidth: 0, elevation:0, minHeight: 180}}
            multiline />

          <ScrollView style={{maxHeight: 135}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', columnGap: 16}}>
            {selectedTags.length !== 0 &&
              selectedTags.map((tag) => (
                  <Text key={tag} style={{color: '#2B789D', fontWeight: '700', fontSize: 16, paddingVertical: 4}}>{tag}</Text>
                ))
            }
          </ScrollView>
        </View>
      </View>
      <Pressable
        onPress={()=> setModalVisible((prev) => !prev)}
        style={{marginVertical: 10, flexDirection: 'row', width: 175, marginRight: 100, marginHorizontal: 20, }}
        >
        <View
          style={{flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 10, paddingHorizontal:16, paddingVertical: 10, backgroundColor: '#2B789D'}}
          >
          <CheckListSvg height={17} width={22} color={'#ffffff'} scale={1.1}/>
          <Text
            style={{color: '#ffffff', fontWeight: '700', fontSize: 16}}
            >
            Add/Remove a Tag
          </Text>
        </View>
        <View
          style={{width: 33.5 ,backgroundColor: '#2B789D', aspectRatio: 1, borderRadius: 7, transform: [{rotate: '-45deg'}, {translateX: -20.4}, {translateY: -14.7}], zIndex: -5}}
          />
      </Pressable>
      <Pressable  onPress={handleSubmit(submitData)}>
        <LinearGradient
          start={{x: 0, y: 0.0}}
          end={{x: 1, y: 0.0}}
          colors={['#514AA4', '#744696']}
          style={{
            marginVertical: 15,
            borderRadius: 60,
            elevation: 5,
            paddingVertical: 10,
            marginHorizontal: 20,
          }}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', color: 'white', marginRight: 15}}>Publish</Text>
              <PublishArrowSvg color='white' height={14} width={16}/>
            </View>
        </LinearGradient>
      </Pressable>
      <SelectHashTagsModal 
        buttonText={'Update Post'}
        body={'Add or remove tags from your post, so others can easily find it.'}
        state={modalVisible}
        setModalVisible={setModalVisible}
        tagData={selectedTags}
        setModalReturn={setSelectedTags} />
    </View>
  )
}

export default NewPost
