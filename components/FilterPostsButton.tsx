import {  Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import FilterSearchSvg from './svg-components/filterSvg'
import { LinearGradient } from 'expo-linear-gradient'
import { searchStore } from '@utils/stores/searchStore'
import SelectHashTagsModal from './SelectHashTagsModal'


const FilterPostsButton = () => {
  const search = searchStore((state) => state.search)
  const setSearch = searchStore((state) => state.setSearch)
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <>
      <Pressable 
        onPress={() => setModalVisible(true)}
        style={{width: 300}}
      >
        <LinearGradient
          start={{x: 0, y: 0.0}}
          end={{x: 1, y: 0.0}}
          colors={search.length ? ['#E6E4FF', '#D9E5FF'] : ['#5049A4', '#385592']}
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical:9, paddingHorizontal: 15, borderRadius: 50 }}>
          <Text numberOfLines={1} style={{overflow: 'hidden', fontSize: 17, color: search.length ? '#000000' : '#ffffff', maxHeight: 24, flex: 1}}>
            {search.length ? `${search.join(', ')}` : 'Filter Posts By Tag'}
            </Text>
          <FilterSearchSvg width={30} height={30} fill={search.length ? '#6D6B82' : '#ffffff'} scale={0.86} />
        </LinearGradient>
      </Pressable>
      <SelectHashTagsModal 
      buttonText={'Search Tags'}
      body={'Add or remove tags from your search'}
      state={modalVisible}
      setModalVisible={setModalVisible}
      tagData={search}
      setModalReturn={setSearch} />
    </>
  )
}

export default FilterPostsButton