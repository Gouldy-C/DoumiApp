import { Pressable, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import CommentPostSvg from './svg-components/commentPostSvg'
import { constStyles } from '@constants/Styles'
import { FirestorePost } from '@utils/types/types'
import firestore from '@react-native-firebase/firestore';
import CommentsModal from './CommentsModal'


const CommentButton = ({post} : {
  post: FirestorePost
}) => {
  const commentsRef = firestore().collection('Posts').doc(post.post_id).collection('comments')
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const [count, setCount] = useState(0)

  // const fetchCommentsCount = async () => {
  //   try {
  //     const count = await commentsRef.get();
  //     const numberOfComments = querySnapshot.size;
  //     setCount(numberOfComments);
  //   } catch (error) {
  //     console.error('Error fetching comment count:', error);
  //   }
  // };

  useLayoutEffect(() => {
    const subscriber = commentsRef.countFromServer().query.onSnapshot(
      async (countSnapshot) => await countSnapshot.query.countFromServer().get().then(
        async (data) => setCount(data.data().count)
      ),
      (error) => console.error(error)
    )
    return subscriber;
  }, []);
  
  return (
    <>
      <Pressable style={constStyles.labels} onPress={() => setCommentModalVisible(true)}>
        <CommentPostSvg stroke='#5049A4' scale={0.77} height={22} width={28}/>
        <Text style={{fontWeight: 'bold', color: '#5049A4', fontSize: 18, textAlignVertical: 'center'}}>{count}</Text>
      </Pressable>
      <CommentsModal post={post} state={commentModalVisible} setModalVisible={setCommentModalVisible}/>
    </>
  )
}

export default CommentButton