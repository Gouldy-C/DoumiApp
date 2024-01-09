import { Pressable, Text } from 'react-native'
import React from 'react'
import CommentPostSvg from './svg-components/commentPostSvg'
import { constStyles } from '@constants/Styles'


const CommentPost = () => {
  return (
    <Pressable style={constStyles.labels}>{
      <CommentPostSvg scale={0.73} height={25} width={25}/>
    }
      <Text>1</Text>
    </Pressable>
  )
}

export default CommentPost