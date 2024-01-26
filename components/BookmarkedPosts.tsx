import { Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg'
import { handleBookMark } from '@utils/posting/functions'
import BookmarkedSvg from './svg-components/bookmarkedSvg'
import auth from '@react-native-firebase/auth'
import { FirestorePost } from '@utils/types/types'


const BookmarkPost = ({post}: {post: FirestorePost}) => {
  const userId = auth().currentUser?.uid || ''
  const [bookmarked, setBookmarked] = useState(post.bookmarkedPosts.includes(userId))
  

  useEffect(() => {
    setBookmarked(post.bookmarkedPosts.includes(userId))
  }, [post.bookmarkedPosts])


  const flipBookmark = async () => {
    setBookmarked((prev) => !prev)
    await handleBookMark(post.post_id)
  }

  return (
    <>
    { bookmarked ? (
        <Pressable onPress={flipBookmark} style={{ paddingHorizontal:20, paddingVertical: 25}}>
          <BookmarkedSvg height={28} width={25} color={'#5049A4'} stroke={'#5049A4'} scale={0.8}/>
        </Pressable>
      ) : (
        <Pressable onPress={flipBookmark} style={{ paddingHorizontal:20, paddingVertical: 25}}>
          <NotBookmarkedSvg height={28} width={25} color={'#424052'} stroke={'#5049A4'} scale={1}/>
        </Pressable>
      )
    }
  </>
  )
}

export default BookmarkPost