import { Pressable } from 'react-native'
import React from 'react'
import StrategyCard from './StrategyCard';
import { filterStrategies } from '@utils/strategiesFunctions';



const StrategiesGroupScroll = ({
  groupIndex,
  setSelectedStrategyIndex
}:{
  groupIndex: number,
  setSelectedStrategyIndex: React.Dispatch<React.SetStateAction<number | null>>,
}) => {
  const filteredStrategies = filterStrategies(groupIndex)
  
  return(
    <>
      {filteredStrategies
      .map((strategy, index) => (
        <Pressable
          style={{marginVertical: 14}}
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