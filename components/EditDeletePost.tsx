import { View, Text, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import EllipsisMenu from './svg-components/ellipsisMenu'
import AreYouSureModal from './AreYouSureModal'
import { deletePost } from '@utils/posting/functions'
import { FirestorePost } from '@utils/types/types'
import EditPostModal from './EditPostModal'
import TrashCanSvg from './svg-components/trashCan'
import PencilSvg from './svg-components/pencil'



const EditDeletePost = ({post} : {post: FirestorePost}) => {
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editDeleteModalVisible, setEditDeleteModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const userId= auth().currentUser?.uid
  const question = "Are you sure you want to delete this post?"

  const closeModal = () => {
    setEditDeleteModalVisible(false)
  }

  return (
    <>
      <View style={{position: 'absolute', bottom: 0, right: 15}}>
        {userId == post.uid && (
          <Pressable style={{paddingHorizontal: 18, paddingVertical:15,}} onPress={() => setEditDeleteModalVisible(true)}>
            <EllipsisMenu scale={0.90} height={30} width={20}/>
          </Pressable>
        )}
        <Modal
          animationType='fade'
          transparent={true}
          visible={editDeleteModalVisible}
          onRequestClose={closeModal}
          style={{}}
        >
          <Pressable style={{paddingHorizontal: 24, paddingVertical:16, flexDirection: 'row'}} onPress={() => setEditModalVisible(true)}>
            <TrashCanSvg scale={0.90} height={30} width={20}/>
            <Text>Delete</Text>
          </Pressable>
          <Pressable style={{paddingHorizontal: 24, paddingVertical:16, flexDirection: 'row'}} onPress={() => setDeleteModalVisible(true)}>
            <PencilSvg scale={0.90} height={30} width={20}/>
            <Text>Edit</Text>
          </Pressable>
        </Modal>
      </View>
      <EditPostModal state={editModalVisible} postId={post.post_id} postContent={post.content} postTags={post.hashTags} setEditModalVisible={setEditModalVisible} />
      <AreYouSureModal header={question} state={deleteModalVisible} setModalVisible={setDeleteModalVisible} onConfirmFunction={() => deletePost(post)}/>
    </>
  )
}

export default EditDeletePost