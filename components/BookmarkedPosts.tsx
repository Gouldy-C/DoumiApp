import { Pressable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg'
import { handleBookMark } from '@utils/posting/functions'
import BookmarkedSvg from './svg-components/bookmarkedSvg'
import auth from '@react-native-firebase/auth'
import { FirestorePost } from '@utils/types/types'
import AreYouSureModal from './AreYouSureModal'


const BookmarkPost = ({post}: {post: FirestorePost}) => {
  const userId = auth().currentUser!.uid
  const [bookmarked, setBookmarked] = useState(post.bookmarkedPosts.includes(userId))
  const [modalVisible, setModalVisible] = useState(false);
  const question = "Are you sure you want to remove this post from your saved posts list?"


  useEffect(() => {
    setBookmarked(post.bookmarkedPosts.includes(userId))
  }, [post.bookmarkedPosts.includes(userId)])

  const flipBookmark = async () => {
    setBookmarked((prev) => !prev)
    handleBookMark(post.post_id)
  }

  const onBookmarkClick = () => {
    if (bookmarked) {
      setModalVisible(true)
    }
    else {
      flipBookmark()
    }
  }

  
  return (
    <View key={post.post_id}>
      {bookmarked ?
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 15}}>
          <BookmarkedSvg height={28} width={25} color={'#5049A4'} scale={1}/>
        </Pressable>
          :
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 15}}>
          <NotBookmarkedSvg height={28} width={25} color={'#424052'} scale={1}/>
        </Pressable>
      }
      <AreYouSureModal header={question} state={modalVisible} setModalVisible={setModalVisible} onConfirmFunction={flipBookmark}/>
    </View>
  )
}

export default BookmarkPost