import { Pressable, View } from 'react-native'
import React from 'react'
import StrategyCard from './StrategyCard';
import { filterStrategies } from '@utils/strategiesFunctions';
import { userStore } from '@utils/stores/userStore';
import { LinearGradient } from 'expo-linear-gradient';



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
    <LinearGradient
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0.0 }}
      colors={['#73459540', '#9D4C8240']}
      style={{ width: '90%', alignSelf: 'center' }}
    >
      {filteredStrategies
      .map((strategy, index) => (
        <Pressable
          style={{marginBottom: 2}}
          key={index}
          onPress={() => setSelectedStrategyIndex(index)}
          >
          <StrategyCard strategy={strategy}/>

        </Pressable>
      ))}
    </LinearGradient>
  )
}

export default StrategiesGroupScroll

//index + 1 >= filteredStrategies.length ? 0 : index + 1