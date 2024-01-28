import { Pressable } from 'react-native'
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
  }, [post.bookmarkedPosts])


  const flipBookmark = async () => {
    setBookmarked((prev) => !prev)
    await handleBookMark(post.post_id)
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
    <>
    { userId != post.uid  && (
      bookmarked ? (
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 25}}>
          <BookmarkedSvg height={28} width={25} color={'#5049A4'} stroke={'#5049A4'} scale={1}/>
        </Pressable>
      ) : (
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 25}}>
          <NotBookmarkedSvg height={28} width={25} color={'#424052'} stroke={'#5049A4'} scale={1}/>
        </Pressable>
      )
    )}
    <AreYouSureModal header={question} state={modalVisible} setModalVisible={setModalVisible} onConfirmFunction={flipBookmark}/>
  </>
  )
}

export default BookmarkPost