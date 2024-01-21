import { Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentPostSvg from './svg-components/commentPostSvg'
import { constStyles } from '@constants/Styles'
import { FirestoreComment, FirestorePost } from '@utils/types/types'
import { useFocusEffect } from 'expo-router'


const CommentPost = ({
  onPress, 
  comments, 
  post
}:{
  onPress:(post_id:string)=>void,
  comments: FirestoreComment[],
  post: FirestorePost
}) => {
  const [count, setCount] = useState(0)

  useEffect(()=> {
    setCount(comments.length)
  }, [comments, post.post_id]);

  useFocusEffect(
    React.useCallback(() => {
      setCount(comments.length);
    }, [comments])
  );

  const handlePress = () => {
    onPress(post.post_id);
    console.log('Clicked post_id', post.post_id);
  };
  
  return (
    <Pressable style={constStyles.labels} onPress={handlePress}>{
      <CommentPostSvg stroke="#9747FF" scale={0.73} height={25} width={25}/>
    }
      <Text style={{fontWeight: 'bold', color: '#9747FF'}}>{count}</Text>
    </Pressable>
  )
}

export default CommentPost