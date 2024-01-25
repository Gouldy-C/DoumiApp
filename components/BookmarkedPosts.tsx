import { Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg'
import { bookmarkPost } from '@utils/bookmarkPostFunction'
import { userStore } from '@utils/stores/userStore'
import BookmarkedSvg from './svg-components/bookmarkedSvg'


const BookmarkPost = ({post_id}:{post_id: string}) => {
  const {userDoc} = userStore((state) => state)
  const [bookmarked, setBookmarked] = useState(userDoc?.bookmarkedPosts?.includes(post_id))
  

  useEffect(() => {
    setBookmarked(userDoc?.bookmarkedPosts.includes(post_id))
  }, [userDoc?.bookmarkedPosts])


  const flipBookmark = async () => {
    setBookmarked((prev) => !prev)
    await bookmarkPost(post_id)
    console.log(post_id)
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