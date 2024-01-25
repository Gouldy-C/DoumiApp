import {Text, View, StyleSheet, Pressable, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { handleComment } from '@utils/commenting/functions';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextInput from '@components/ControlledTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import PublishArrowSvg from '@components/svg-components/publishArrowSvg';
import { FirestorePost } from '@utils/types/types'
import { Control, Controller } from 'react-hook-form'
import { router } from 'expo-router';

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

const NewComment = ({post_id}: {post_id: string}) => {
  const schema: ZodType<FormData> = z.object({
    commentInput: z
      .string()
      .min(2, "Comment must be longer then 2 characters")
      .max(1000,"Comment must be less then 1000 characters")
  });

  const [commentInput, setCommentInput] = useState('');
  const [ isKeyboardVisible, setKeyboardVisible ] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      commentInput: commentInput
    }
  });
  const submittedPostId = post_id

  const submitData = async (data: FormData) => {
    handleComment({ post_id: submittedPostId, input: data.commentInput })
    router.push('/(user)/(feed)/userFeed')
    reset({ commentInput: "" })
  };


  useEffect(()=> {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=> {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=> {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  },[])

  return (
<View style={{height: '10%'}}>
      <View style={styles.container}>
        <ControlledTextInput
          control={control}
          placeholder={"Write a comment"}
          name={"commentInput"} 
          styles={{textAlignVertical: 'top', flex: 1, elevation:0, minHeight: '50%', paddingLeft: 16}}
          multiline
        />
        </View>

        <View>
          <Pressable 
            onPress={handleSubmit(submitData)}
            style={{width: '100%', alignItems: 'center'}}> 
            <LinearGradient
              start={{x: 0, y: 0.0}}
              end={{x: 1, y: 0.0}}
              colors={['#514AA4', '#744696']}
              style={styles.button}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500', color: 'white', marginRight: 15}}>
                    Publish
                  </Text>
                  <PublishArrowSvg color='white' height={14} width={16}/>
                </View>
            </LinearGradient>
          </Pressable>
</View>
    </View>
  );
};

export default NewComment

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    paddingBottom: 20,
    width: "100%",
    alignSelf: "center",
    paddingLeft: 1,
  },
  button: {
    // borderRadius: 60,
    elevation: 5,
    paddingVertical: 8,
    width: '100%',
    marginHorizontal: 20,
  },
})