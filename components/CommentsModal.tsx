import { View, Text, Modal, Pressable, Image, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CommentBox from './CommentBox'
import NewComment from './NewComment'
import BackArrowSvg from './svg-components/backArrowSvg'
import { FirestorePost } from '@utils/types/types'
import BookmarkPost from './BookmarkedPosts'
import { calculateTimeDifference } from '@utils/timeFunctions'
import { constStyles } from '@constants/Styles'
import { Keyboard } from 'react-native';

const CommentsModal = ({state, setModalVisible, post}: {
  state: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  post: FirestorePost,
}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Modal
      animationType='slide'
      visible={state}
      >
      <ScrollView contentContainerStyle={{ opacity: isKeyboardOpen ? 0.5 : 1  }}>
        <View style={{ flex: 1, alignItems: 'flex-start',  paddingLeft: 10 }}>
          <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: 10, paddingTop: 8}}>

            <Pressable onPress={() => setModalVisible(false)} style={{ width: 24, marginRight: 20, marginLeft: 6 }}>
              <BackArrowSvg height={24} width={20} color={'#424052'} scale={1.2} />
            </Pressable>
            <Image
              source={{ uri: post.photoURL }}
              style={{ height: 35, aspectRatio: 1, borderRadius: 50, marginRight: 5 }}
            />

            <View>
              <Text style={{ fontSize: 19, fontWeight: '500' }}>{post.displayName}</Text>
              <Text style={{opacity: 0.7}}>{post.timestamp?.seconds && calculateTimeDifference(post.timestamp.toDate())}</Text>
            </View>
          </View>
          <View style={{position: 'absolute', right: 0, top: 0 }}>
            <BookmarkPost post={post} />
          </View>


          <View style={{paddingRight: 25, width: '100%'}}>
              <Text style={constStyles.postText}>
                {post.content}
              </Text>
          </View>
          <Text style={{ color: '#2B789D', fontSize: 16, fontWeight: 'bold', paddingVertical: 16, marginLeft: 6 }}>
            {post.hashTags.join('     ')}
          </Text>
        </View>
        <View  style={{flex: 1, justifyContent: 'flex-end'}}>
          <CommentBox
            post={post}
          />
        </View>
      </ScrollView>
      <NewComment 
        post={post}
      />
    </Modal>
  )
}

export default CommentsModal