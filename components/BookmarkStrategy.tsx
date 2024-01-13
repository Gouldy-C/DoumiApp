import { Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg'
import { bookmarkStrategy } from '@utils/strategiesFunctions'
import { userStore } from '@utils/stores/userStore'
import BookmarkedSvg from './svg-components/bookmarkedSvg'



const BookmarkStrategy = ({strategy_id}:{strategy_id: string}) => {
  const {userDoc} = userStore((state) => state)
  const [bookmarked, setBookmarked] = useState(userDoc?.bookmarkedStrategies.includes(strategy_id))
  

  useEffect(() => {
    setBookmarked(userDoc?.bookmarkedStrategies.includes(strategy_id))
  }, [strategy_id, userDoc?.bookmarkedStrategies])
  

  const onBookmarkClick = () => {
    setBookmarked((prev) => !prev)
    bookmarkStrategy(strategy_id)
  }


  return (
    <>
      {bookmarked ?
        <Pressable onPress={onBookmarkClick} style={{ padding:15}}>
          <BookmarkedSvg height={28} width={25} color={'black'} scale={0.95}/>
        </Pressable>
          :
        <Pressable onPress={onBookmarkClick} style={{ padding:15}}>
          <NotBookmarkedSvg height={28} width={25} color={'black'} scale={0.95}/>
        </Pressable>
        }
    </>
  )
}

export default BookmarkStrategy