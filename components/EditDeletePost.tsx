import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import EllipsisMenu from './svg-components/ellipsisMenu'
import AreYouSureModal from './AreYouSureModal'
import { deletePost } from '@utils/posting/functions'
import { FirestorePost } from '@utils/types/types'
import TrashCanSvg from './svg-components/trashCan'
import PencilSvg from './svg-components/pencil'
import EditPostModal from './EditPostmodal'



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
      {userId == post.uid && (
        <>
          <View style={{position: 'absolute', bottom: 0, right: 15}}>
            <Pressable style={{paddingHorizontal: 18, paddingVertical:15,}} onPress={() => setEditDeleteModalVisible(true)}>
              <EllipsisMenu scale={0.90} height={30} width={20}/>
            </Pressable>
            <Modal
              animationType='fade'
              transparent={true}
              visible={editDeleteModalVisible}
              onRequestClose={closeModal}
            >
              <TouchableOpacity style={{height: '100%', width: '100%', backgroundColor: '#00000024', justifyContent: 'center', alignItems: 'center'}} onPress={closeModal}>
                <View style={{backgroundColor:'#EDF1FF', position: 'absolute', padding: 2, gap: 2}}>
                  <Pressable style={{paddingHorizontal: 24, paddingVertical:16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#ffffff'}} onPress={() => {setDeleteModalVisible(true); closeModal()}}>
                    <TrashCanSvg scale={1} height={20} width={20} color={'#5049A4'}/>
                    <Text style={{color: '#5049A4', fontWeight: '600', fontSize: 18, width: 60}}>Delete</Text>
                  </Pressable>
                  <Pressable style={{paddingHorizontal: 24, paddingVertical:16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#ffffff'}} onPress={() => {setEditModalVisible(true); closeModal()}}>
                    <PencilSvg scale={1} height={20} width={20} color={'#5049A4'}/>
                    <Text style={{color: '#5049A4', fontWeight: '600', fontSize: 18, width: 60}}>Edit</Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
          <EditPostModal state={editModalVisible} postId={post.post_id} postContent={post.content} postTags={post.hashTags ? post.hashTags : []} setEditModalVisible={setEditModalVisible}/>
          <AreYouSureModal header={question} state={deleteModalVisible} setModalVisible={setDeleteModalVisible} onConfirmFunction={() => deletePost(post)}/>
        </>
      )}
    </>
  )
}

export default EditDeletePost