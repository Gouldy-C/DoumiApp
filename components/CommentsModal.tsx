import { View, Text, Modal, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CommentBox from './CommentBox'
import NewComment from './NewComment'
import BackArrowSvg from './svg-components/backArrowSvg'
import { FirestorePost } from '@utils/types/types'
import BookmarkPost from './BookmarkedPosts'

const CommentsModal = ({state, setModalVisible, post}: {
  state: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  post: FirestorePost,
}) => {
  return (
    <View>
      <Modal
        animationType='slide'
        visible={state}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', gap: 12, paddingLeft: 16 }}>
              <Pressable onPress={() => setModalVisible(false)} style={{ width: 24, marginRight: 20 }}>
                <BackArrowSvg height={24} width={20} color={'#424052'} scale={1.2} />
              </Pressable>
                <Image
                  source={{ uri: post.photoURL }}
                  style={{ height: 35, aspectRatio: 1, borderRadius: 50 }}
                />
              <View>
                <Text style={{ fontSize: 19, fontWeight: '500' }}>{post.displayName}</Text>
                <Text>{post.timestamp?.seconds && post.timestamp.toDate().toLocaleString()}</Text>
              </View>
            </View>
            <BookmarkPost post={post} />
          </View>
          <LinearGradient
            start={{ x: 0, y: 0.0 }}
            end={{ x: 1, y: 0.0 }}
            colors={['rgba(115, 69, 149, 0.2)', 'rgba(72, 104, 167, 0.2)']}
            style={{ flex: 1 }}
          >
            <View  style={{flex: 1, justifyContent: 'flex-end'}}>
              <CommentBox
                post={post}
              />
              <NewComment 
                post={post}
              />

          </View>
        </LinearGradient>
      </Modal>
    </View>
  )
}

export default CommentsModal