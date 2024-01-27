import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import EllipsisMenu from './svg-components/ellipsisMenu'
import AreYouSureModal from './AreYouSureModal'
import { deletePost } from '@utils/posting/functions'
import { FirestorePost } from '@utils/types/types'



const EditDeletePost = ({post} : {post: FirestorePost}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const userId= auth().currentUser?.uid
  const question = "Are you sure you want to delete this post?"

  return (
    <>
      <View style={{position: 'absolute', bottom: 0, right: 15}}>
        {userId == post.uid && (
          <Pressable style={{paddingHorizontal: 18, paddingVertical:15,}} onPress={() => setDeleteModalVisible(true)}>
            <EllipsisMenu scale={0.90} height={30} width={20}/>
          </Pressable>
        )}
      </View>
      <AreYouSureModal header={question} state={deleteModalVisible} setModalVisible={setDeleteModalVisible} onConfirmFunction={() => deletePost(post)}/>
    </>
  )
}

export default EditDeletePost