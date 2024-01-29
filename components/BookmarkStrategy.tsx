import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg'
import { bookmarkStrategy } from '@utils/strategiesFunctions'
import { userStore } from '@utils/stores/userStore'
import BookmarkedSvg from './svg-components/bookmarkedSvg'
import AreYouSureModal from './AreYouSureModal'



const BookmarkStrategy = ({strategy_id}:{strategy_id: string}) => {
  const isBookmarked = userStore((state) => state.userDoc!.bookmarkedStrategies.includes(strategy_id))
  const [modalVisible, setModalVisible] = useState(false);
  const question = "Are you sure you want to remove this strategy from your saved list?"


  const flipBookmark = async () => {
    bookmarkStrategy(strategy_id)
  }

  const onBookmarkClick = () => {
    if (isBookmarked) {
      setModalVisible(true)
    }
    else {
      flipBookmark()
    }
  }


  return (
    <View key={strategy_id}>
      {isBookmarked ?
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

export default BookmarkStrategy