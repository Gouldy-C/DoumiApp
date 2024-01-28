import { View, Text, Modal, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CommentBox from './CommentBox'
import NewComment from './NewComment'
import BackArrowSvg from './svg-components/backArrowSvg'
import { FirestorePost } from '@utils/types/types'
import BookmarkPost from './BookmarkedPosts'
import { calculateTimeDifference } from '@utils/timeFunctions'
import { constStyles } from '@constants/Styles'

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
          <View style={{flexDirection: 'row', alignItems: 'center' }}>

            <View style={{ flex: 1, alignItems: 'flex-start',  paddingLeft: 10 }}>

                <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>

                  <Pressable onPress={() => setModalVisible(false)} style={{ width: 24, marginRight: 20, marginLeft: 6 }}>
                    <BackArrowSvg height={24} width={20} color={'#424052'} scale={1.2} />
                  </Pressable>
                  <Image
                    source={{ uri: post.photoURL }}
                    style={{ height: 35, aspectRatio: 1, borderRadius: 50, marginRight: 5 }}
                  />

                  <View>
                    <Text style={{ fontSize: 19, fontWeight: '500' }}>{post.displayName}</Text>
                    <Text>{post.timestamp?.seconds && calculateTimeDifference(post.timestamp.toDate())}</Text>
                  </View>

                </View>

                <View style={{paddingRight: 25, width: '100%'}}>
                    <Text style={constStyles.postText}>
                      {post.content}
                    </Text>
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