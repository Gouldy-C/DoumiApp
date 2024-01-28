import { Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { handleLike } from '@utils/posting/functions'
import auth from '@react-native-firebase/auth'
import LikedHeart from './svg-components/likedHeart'
import UnlikedHeart from './svg-components/unlikedHeart'
import { constStyles } from '@constants/Styles';
import { FirestoreComment, FirestorePost } from '@utils/types/types'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

const LikeAThing = ({post, firestoreRef, scale=1}: {
    post: FirestorePost| FirestoreComment,
    firestoreRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    scale?: number
  }) => {
  const userId = auth().currentUser?.uid as string
  const [liked, setLiked] = useState(post.likedArray.includes(userId))
  const [count, setCount] = useState(post.likedArray.length)
  
  useEffect(() => {
    setLiked(post.likedArray.includes(userId))
    setCount(post.likedArray.length)
  }, [post.likedArray])
  
  
  
  const onLikeClick = (toggle: boolean) => {
    setCount((prev) => toggle ? prev + 1 : prev - 1)
    setLiked((prev) => !prev)
    handleLike(firestoreRef)
  }


  return (
    <>
      {liked ?
        <Pressable style={[constStyles.labels, {transform: [{scale:scale}]}]} onPress={() => onLikeClick(false)}>
          <LikedHeart fill="#5049A4" stroke="#5049A4" scale={0.78} height={23} width={26}/>
          <Text style={{fontWeight: 'bold', color: '#5049A4', fontSize: 18, textAlignVertical: 'center'}}>{count}</Text>
        </Pressable>
        :
        <Pressable style={[constStyles.labels, {transform: [{scale:scale}]}]} onPress={() => onLikeClick(true)}>
          <UnlikedHeart stroke="#5049A4" strokeWidth={1} scale={0.78} height={23} width={26}/>
          <Text style={{fontWeight: 'bold', color: '#5049A4', fontSize: 18, textAlignVertical: 'center'}}>{count}</Text>
        </Pressable>
      }
    </>
  )
}

export default LikeAThing