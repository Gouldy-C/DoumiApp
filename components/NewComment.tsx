import {Text, View, StyleSheet, Pressable, TextInput} from 'react-native'
import React, { useState } from 'react'
import { handleComment } from '@utils/posting/functions';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextInput from '@components/ControlledTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import PublishArrowSvg from '@components/svg-components/publishArrowSvg';
import { FirestorePost } from '@utils/types/types'
import { Control, Controller } from 'react-hook-form'

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

  const [commentInput, setCommentInput] = useState('')

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


  const submitData = async (data: FormData) => {
    const submittedPostId = post_id
    console.log('received post_id', submittedPostId); 
    await handleComment({ post_id: submittedPostId, input: data.commentInput })
    console.log('posted post_id', submittedPostId)
    reset({ commentInput: "" })
  };


  return (
    <View style={{height: '50%'}}>
      <View style={styles.container}>
        <ControlledTextInput
          control={control}
          placeholder={"Write a comment"}
          name={"commentInput"} 
          label={"Comments"}
        />
        <Pressable onPress={handleSubmit(submitData)}> 
          <LinearGradient
            start={{x: 0, y: 0.0}}
            end={{x: 1, y: 0.0}}
            colors={['#514AA4', '#744696']}
            style={styles.button}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', color: 'white', marginRight: 15}}>
                  Publish
                </Text>
                <PublishArrowSvg color='white' height={14} width={16}/>
              </View>
          </LinearGradient>
        </Pressable>
      </View>
    </ View>
  );
};

export default NewComment

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    paddingBottom: 50,
    width: "100%",
    alignSelf: "center",
    paddingLeft: 1,
  },
  button: {
    marginVertical: 30,
    borderRadius: 60,
    elevation: 8,
    paddingVertical: 10,
  },
})