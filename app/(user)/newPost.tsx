import {Text, View, StyleSheet, TextInput, Button, Pressable} from 'react-native'
import React, { useState } from 'react'
import { handlePost } from '@utils/posting/functions';
import { router } from 'expo-router';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextInput from '@components/ControlledTextInput';


type FormData = {
  post: string;
};

const NewPost = () => {
  const schema: ZodType<FormData> = z.object({
    post: z
      .string()
      .min(2)
      .max(1000)
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: FormData) => {
    handlePost(data.post)
    router.push('/(user)/(feed)/userFeed')
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
            <Text style={styles.button}>Post</Text>
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
    width: "80%",
    alignSelf: "center",
    paddingLeft: 1,
  },
  button: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
})