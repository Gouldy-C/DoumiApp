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
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        placeholder={"Your Post"}
        name={"post"}
        label={"New Post"}
      />
      <Pressable  onPress={handleSubmit(submitData)}>
        <LinearGradient
          start={{x: 0, y: 0.0}}
          end={{x: 1, y: 0.0}}
          colors={['#514AA4', '#744696']}
          style={styles.button}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <PublishArrowSvg color='white' height={14} width={16}/>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', color: 'white', marginLeft: 15}}>Publish</Text>
            </View>
        </LinearGradient>
      </Pressable>
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
    flex: 1,
    marginVertical: 20,
    width: "80%",
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