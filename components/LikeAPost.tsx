import { Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { handleLike } from '@utils/posting/functions'
import auth from '@react-native-firebase/auth'
import LikedHeart from './svg-components/likedHeart'
import UnlikedHeart from './svg-components/unlikedHeart'
import { constStyles } from '@constants/Styles';
import { FirestorePost } from '@utils/types/types'

const LikeAPost = ({post}: {post: FirestorePost}) => {
  const userId = auth().currentUser?.uid || ''
  const [liked, setLiked] = useState(post.likedPost.includes(userId as string))
  const [count, setCount] = useState(post.likedPost.length)
  
  useEffect(() => {
    setLiked(post.likedPost.includes(userId as string))
    setCount(post.likedPost.length)
  }, [post.likedPost])
  
  
  
  const onLikeClick = (toggle: boolean) => {
    setCount((prev) => toggle ? prev + 1 : prev - 1)
    setLiked((prev) => !prev)
    handleLike(post.post_id)
  }


  return (
    <>
      {liked ?
        <Pressable style={constStyles.labels} onPress={() => onLikeClick(false)}>
          <LikedHeart scale={0.75} height={25} width={28}/>
          <Text>{count}</Text>
        </Pressable>
        :
        <Pressable style={constStyles.labels} onPress={() => onLikeClick(true)}>
          <UnlikedHeart scale={0.75} height={25} width={25}/>
          <Text>{count}</Text>
        </Pressable>
      }
    </>
  )
}

export default LikeAPost