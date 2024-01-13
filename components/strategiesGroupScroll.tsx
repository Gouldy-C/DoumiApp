import { Pressable } from 'react-native'
import React from 'react'
import StrategyCard from './StrategyCard';
import { filterStrategies } from '@utils/strategiesFunctions';
import { userStore } from '@utils/stores/userStore';



const StrategiesGroupScroll = ({
  groupIndex,
  setSelectedStrategyIndex
}:{
  groupIndex: number,
  setSelectedStrategyIndex: React.Dispatch<React.SetStateAction<number | null>>,
}) => {
  const {userDoc} = userStore((state) => state)
  const filteredStrategies = filterStrategies(groupIndex, userDoc?.bookmarkedStrategies!)
  
  return(
    <>
      {filteredStrategies
      .map((strategy, index) => (
        <Pressable
          style={{marginBottom: 22}}
          key={index}
          onPress={() => setSelectedStrategyIndex(index)}
          >
          <StrategyCard strategy={strategy}/>

        </Pressable>
      ))}
    </>
  )
}

export default StrategiesGroupScroll

//index + 1 >= filteredStrategies.length ? 0 : index + 1