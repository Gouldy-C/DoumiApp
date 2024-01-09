import { Pressable, Text } from 'react-native'
import React from 'react'
import { handleLike } from '@utils/posting/functions'
import auth from '@react-native-firebase/auth'
import LikedHeart from './svg-components/likedHeart'
import UnlikedHeart from './svg-components/unlikedHeart'
import { constStyles } from '@constants/Styles';

const LikeAPost = ({post_id, likedPost}: {post_id: string, likedPost: string[]}) => {
  const userId = auth().currentUser?.uid || ''
  return (
    <Pressable style={constStyles.labels} onPress={()=>handleLike(post_id)}>{
      likedPost.includes(userId as string) ?
      <LikedHeart scale={0.75} height={25} width={28}/>
      :
      <UnlikedHeart scale={0.75} height={25} width={25}/>
    }
      <Text>{likedPost.length}</Text>
    </Pressable>
  )
}

export default LikeAPost