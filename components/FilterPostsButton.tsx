import {  Text, Pressable } from 'react-native'
import React from 'react'
import FilterSearchSvg from './svg-components/filterSvg'
import { LinearGradient } from 'expo-linear-gradient'
import { searchStore } from '@utils/stores/searchStore'


const FilterPostsButton = () => {
  const search = searchStore((state) => state.search)


  return (
    <Pressable onPress={}>
      <LinearGradient
        start={{x: 0, y: 0.0}}
        end={{x: 1, y: 0.0}}
        colors={['#5049A4', '#385592']}
        style={{flexDirection: 'row'}}>
        <Text>Filter Posts By Tag</Text>
        <FilterSearchSvg width={25} height={25} fill={'#ffffff'} scale={1} />
      </LinearGradient>
    </Pressable>
  )
}

export default FilterPostsButton