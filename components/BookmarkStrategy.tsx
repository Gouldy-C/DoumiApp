import { Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg'
import { bookmarkStrategy } from '@utils/strategiesFunctions'
import { userStore } from '@utils/stores/userStore'
import BookmarkedSvg from './svg-components/bookmarkedSvg'
import AreYouSureModal from './AreYouSureModal'



const BookmarkStrategy = ({strategy_id}:{strategy_id: string}) => {
  const bookmarkedStrategies = userStore((state) => state.userDoc!.bookmarkedStrategies)
  const [bookmarked, setBookmarked] = useState(bookmarkedStrategies.includes(strategy_id))
  const [modalVisible, setModalVisible] = useState(false);
  const question = "Are you sure you want to remove this strategy from your saved list?"
  

  useEffect(() => {
    setBookmarked(bookmarkedStrategies.includes(strategy_id))
  }, [bookmarkedStrategies])


  const flipBookmark = async () => {
    setBookmarked((prev) => !prev)
    await bookmarkStrategy(strategy_id)
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
      {bookmarked ?
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 25}}>
          <BookmarkedSvg height={28} width={25} color={'#5049A4'} scale={1}/>
        </Pressable>
          :
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 25}}>
          <NotBookmarkedSvg height={28} width={25} color={'#424052'} scale={1}/>
        </Pressable>
      }
      <AreYouSureModal header={question} state={modalVisible} setModalVisible={setModalVisible} onConfirmFunction={flipBookmark}/>
    </>
  )
}

export default BookmarkStrategy