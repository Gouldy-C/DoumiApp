import { Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import LikedHeart from './svg-components/likedHeart'
import UnlikedHeart from './svg-components/unlikedHeart'
import { FirestoreComment} from '@utils/types/types'
import firestore from '@react-native-firebase/firestore'
import { handleLike } from '@utils/posting/functions'

const LikeAComment = ({ comment }: {comment: FirestoreComment}) => {
  const userId = auth().currentUser!.uid
  const [liked, setLiked] = useState(comment?.likedArray.includes(userId));
  const [count, setCount] = useState(comment?.likedArray.length);
  const commentRef = firestore().collection('Posts').doc(comment.post_id).collection('Comments').doc(comment.comment_id)
  
  useEffect(() => {
    setLiked(comment.likedArray.includes(userId as string));
    setCount(comment.likedArray.length);
  }, [comment.likedArray]);

  const onCommentLikeClick = (toggle: boolean) => {
    setCount((prev) => (toggle ? prev + 1 : prev - 1));
    setLiked((prev) => !prev);
    handleLike(commentRef)
  };

  return (
    <>
      {liked ?
        <Pressable onPress={() => onCommentLikeClick(false)} style={{flexDirection: 'row', gap:6}}>
          <Text style={{fontWeight: 'bold', color: '#5049A4'}}>{count}</Text>
          <LikedHeart fill="#5049A4" stroke="#5049A4" scale={0.7} height={32} width={25}/>
        </Pressable>
        :
        <Pressable onPress={() => onCommentLikeClick(true)} style={{flexDirection: 'row', gap:6}}>
          <Text style={{fontWeight: 'bold', color: '#5049A4'}}>{count}</Text>
          <UnlikedHeart stroke="#5049A4" strokeWidth={1} scale={0.7} height={32} width={25}/>
        </Pressable>
      }
    </>
  )
}

export default LikeAComment