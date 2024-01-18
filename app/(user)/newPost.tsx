import {Text, View, StyleSheet, Pressable} from 'react-native'
import React, { useEffect } from 'react'
import { handlePost } from '@utils/posting/functions';
import { router } from 'expo-router';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextInput from '@components/ControlledTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import PublishArrowSvg from '@components/svg-components/publishArrowSvg';
import BackArrowSvg from '@components/svg-components/backArrowSvg';


type FormData = {
  post: string;
};

const NewPost = () => {
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

  const submitData = async (data: FormData) => {
    handlePost(data.post)
    router.push('/(user)/(feed)/userFeed')
    reset({ post: "" })
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{
        flex: 1,
        width: '90%',
        alignSelf: "center",
      }}>

        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <Pressable onPress={() => {router.back()}} style={{paddingHorizontal:16, paddingVertical: 12}}>
            <BackArrowSvg height={22} width={22} color={'#424052'} scale={1}/>
          </Pressable>
          <Text style={{fontSize: 32, fontWeight: '500'}}>New Post</Text>
        </View>

        <View style={{elevation: 5, backgroundColor: 'white', borderRadius: 8}}>
          <ControlledTextInput
            control={control}
            placeholder={"Write something..."}
            name={"post"}
            styles={{textAlignVertical: 'top', height: 200, paddingVertical: 5, paddingHorizontal: 20, borderWidth: 0, elevation: 0}}
            multiline />




        </View>

          <Pressable  onPress={handleSubmit(submitData)}>
            <LinearGradient
              start={{x: 0, y: 0.0}}
              end={{x: 1, y: 0.0}}
              colors={['#514AA4', '#744696']}
              style={{
                  marginVertical: 30,
                  borderRadius: 60,
                  elevation: 5,
                  paddingVertical: 10,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <PublishArrowSvg color='white' height={14} width={16}/>
                  <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', color: 'white', marginLeft: 15}}>Publish</Text>
                </View>
            </LinearGradient>
          </Pressable>
      </View>
    </View>
  )
}

export default NewPost

const styles = StyleSheet.create({
  
})