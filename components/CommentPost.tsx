import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { handleLike } from '@utils/posting/functions'
import auth from '@react-native-firebase/auth'
import commentPost from './svg-components/commentPost'

const CommentPost = () => {
  return (
    <Pressable>{
      <commentPost scale={0.75} height={25} width={28}/>
    }
    </Pressable>
  )
}

export default CommentPost