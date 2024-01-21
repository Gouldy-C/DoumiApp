import { Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentPostSvg from './svg-components/commentPostSvg'
import { constStyles } from '@constants/Styles'
import { FirestoreComment, FirestorePost } from '@utils/types/types'
import { useFocusEffect } from 'expo-router'
import firestore from '@react-native-firebase/firestore';


const CommentPost = ({
  onPress, 
  comments, 
  post
}:{
  onPress:(post_id:string)=>void,
  comments: FirestoreComment[],
  post: FirestorePost
}) => {
  const commentsRef = firestore().collection('Posts').doc(post.post_id).collection('comments')
  const [count, setCount] = useState(0)

  const fetchCommentsCount = async () => {
    try {
      const querySnapshot = await commentsRef.get();
      const numberOfComments = querySnapshot.size;
      setCount(numberOfComments);
    } catch (error) {
      console.error('Error fetching comment count:', error);
    }
  };

  useEffect(() => {
    fetchCommentsCount();
  }, [comments]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCommentsCount();
    }, [])
  );


  const handlePress = () => {
    onPress(post.post_id);
    console.log('Clicked post_id', post.post_id);
  };
  
  return (
    <Pressable style={constStyles.labels} onPress={handlePress}>
      <CommentPostSvg stroke='#5049A4' scale={0.73} height={25} width={25}/>
      <Text style={{fontWeight: 'bold', color: '#5049A4'}}>{count}</Text>
    </Pressable>
  )
}

export default CommentPost