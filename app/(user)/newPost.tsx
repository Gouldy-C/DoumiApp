import {Text, View, StyleSheet, Pressable} from 'react-native'
import React, { useEffect } from 'react'
import { handlePost } from '@utils/posting/functions';
import { router } from 'expo-router';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextInput from '@components/ControlledTextInput';
import PublishBtn from '@components/svg-components/publishBtn';


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
    formState,
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
      <View style={styles.safeView}>
        <View style={styles.container}>
          <ControlledTextInput
              control={control}
              placeholder={"Your Post"}
              name={"post"}
              label={"New Post"}
            />
          <Pressable onPress={handleSubmit(submitData)}>
            <Text style={styles.button}>Publish<PublishBtn scale={0.75} height={28} width={28}/></Text>
          </Pressable>
        </View>
      </View>
  )
}

export default NewPost

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    marginVertical: 20,
    width: "100%",
    alignSelf: "center",
    paddingLeft: 1,
  },
  button: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#734595',
    color: 'white'
  }
})