import { Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { handleLikeComment } from '@utils/commenting/functions'
import auth from '@react-native-firebase/auth'
import LikedHeart from './svg-components/likedHeart'
import UnlikedHeart from './svg-components/unlikedHeart'
import { FirestoreComment} from '@utils/types/types'
import { FirestorePost } from '@utils/types/types'

const LikeAComment = ({ commentStore, postStore }: { commentStore: FirestoreComment, postStore: FirestorePost }) => {
  const userId = auth().currentUser?.uid || ''
  const [liked, setLiked] = useState(commentStore?.likedComment.includes(userId));
  const [count, setCount] = useState(commentStore?.likedComment.length||0);
  
  useEffect(() => {
    setLiked(commentStore?.likedComment?.includes(userId as string));
    setCount(commentStore?.likedComment?.length || 0);
  }, [commentStore?.likedComment]);

  const onCommentLikeClick = (toggle: boolean) => {
    setCount((prev) => (toggle ? prev + 1 : prev - 1));
    setLiked((prev) => !prev);
    handleLikeComment(commentStore.post_id, commentStore.comment_id)
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