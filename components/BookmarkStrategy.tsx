import { Pressable, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg'
import { bookmarkStrategy } from '@utils/strategiesFunctions'
import { userStore } from '@utils/stores/userStore'
import BookmarkedSvg from './svg-components/bookmarkedSvg'
import AreYouSureModal from './AreYouSureModal'



const BookmarkStrategy = ({ strategy_id }: { strategy_id: string }) => {
  const {userDoc} = userStore((state) => state)
  const [bookmarked, setBookmarked] = useState(false)
  const [modalReturn, setModalReturn] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const question = "Are you sure you want to remove this strategy from your saved list?"
  const equals = userDoc?.bookmarkedStrategies.includes(strategy_id)


  useLayoutEffect(() => {
    if (bookmarked !== equals){
      setBookmarked(equals!)
    }
  }, [equals])


  useLayoutEffect(() => {
    if (modalReturn) {
      setBookmarked((prev) => !prev)
      bookmarkStrategy(strategy_id)
      setModalReturn(false)
    }
  }, [modalVisible])


  const onBookmarkClick = () => {
    if (bookmarked) {
      setModalVisible(true)
    }
    else {
      setBookmarked((prev) => !prev)
      bookmarkStrategy(strategy_id)
    }
  }


  return (
    <View key={strategy_id}>
      {bookmarked ?
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 15}}>
          <BookmarkedSvg height={28} width={25} color={'#5049A4'} scale={1}/>
        </Pressable>
          :
        <Pressable onPress={onBookmarkClick} style={{ paddingHorizontal:20, paddingVertical: 15}}>
          <NotBookmarkedSvg height={28} width={25} color={'#424052'} scale={1}/>
        </Pressable>
      }
      <AreYouSureModal header={question} state={modalVisible} setModalVisible={setModalVisible} setModalReturn={setModalReturn}/>
    </View>
  )
}

export default BookmarkStrategy