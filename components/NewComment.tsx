import {Text, View, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState} from 'react'
import { handleComment } from '@utils/commenting/functions';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextInput from '@components/ControlledTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import PublishArrowSvg from '@components/svg-components/publishArrowSvg';
import { FirestorePost } from '@utils/types/types'
import { Control } from 'react-hook-form'
import { userStore } from '@utils/stores/userStore';

type ControlledInputProps = {
  control: Control<any>,
  name: string,
  placeholder: string,
  label: string,
  secureTextEntry?: boolean
}


type FormData = {
  commentInput: string;
};

const NewComment = ({post}: {post: FirestorePost}) => {
  const userDoc = userStore((state) => state.userDoc)
  
  
  const schema: ZodType<FormData> = z.object({
    commentInput: z
      .string()
      .min(1, "Comment must be longer then 1 characters")
      .max(1000,"Comment must be less then 1000 characters")
  });


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      commentInput: ''
    }
  });

  const submitData = async (data: FormData) => {
    reset({ commentInput: "" })
    await handleComment({ post_id: post.post_id, input: data.commentInput, userDoc: userDoc!})
  };

  

  return (
    <View style={styles.container}>
      <View style={{}}>
      <ControlledTextInput
        keyboardType={'default'}
        control={control}
        placeholder={"Write a comment"}
        name={"commentInput"} 
        styles={{ elevation:0, minHeight: 50, paddingLeft: 55,paddingRight: 5, borderBottomWidth: 0, borderTopWidth: 2, borderRadius: 0, paddingVertical:8}}
        multiline
      />
      <Image
        source={{uri: userDoc!.photoURL!}}
        style={{ height: 45, aspectRatio: 1, position: 'absolute', top: 12,marginHorizontal: 3 }}
      />
      </View>
      <Pressable 
        onPress={handleSubmit(submitData)}
        style={{width: '100%', alignItems: 'center'}}> 
        <LinearGradient
          start={{x: 0, y: 0.0}}
          end={{x: 1, y: 0.0}}
          colors={['#514AA4', '#744696']}
          style={styles.button}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12}}>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', color: 'white'}}>
                Publish
              </Text>
              <PublishArrowSvg color='white' height={14} width={16}/>
            </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default NewComment

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
  },
  button: {
    paddingVertical: 14,
    width: '100%',
  },
})