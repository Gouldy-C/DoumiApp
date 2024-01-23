import { Pressable } from 'react-native'
import React from 'react'
import StrategyCard from './StrategyCard';
import { LinearGradient } from 'expo-linear-gradient';
import { Strategy } from '@utils/types/types';



const StrategiesGroupScroll = ({
  setSelectedStrategyIndex,
  filteredStrategies,
}:{
  setSelectedStrategyIndex: React.Dispatch<React.SetStateAction<number | null>>,
  filteredStrategies : Strategy[],
}) => {
  
  return(
    <LinearGradient
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0.0 }}
      colors={['#73459540', '#9D4C8240']}
      style={{width: '90%', alignSelf: 'center', marginTop: 5, marginBottom: 20 }}
    >
      {filteredStrategies
      .map((strategy, index) => (
        <Pressable
          style={{marginBottom: 1}}
          key={strategy.strategyId}
          onPress={() => setSelectedStrategyIndex(index)}
          >
          <StrategyCard strategy={strategy}/>

        </Pressable>
      ))}
    </LinearGradient>
  )
}

export default StrategiesGroupScroll