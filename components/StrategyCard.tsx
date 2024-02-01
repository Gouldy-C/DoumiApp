import { Text, View, Image } from 'react-native'
import React from 'react'
import { Strategy } from '@utils/types/types'
import BookmarkStrategy from './BookmarkStrategy'
import { useFonts } from 'expo-font';

const StrategyCard = ({strategy} : {strategy : Strategy}) => {

  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
    VerdanaBold: require('../assets/fonts/verdana-bold.ttf'),
    Verdana: require('../assets/fonts/verdana.ttf'),
    InterSemibold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });


  if (error) {
    console.error('Font loading error:', error);
  }
  
  if (!loaded) {
    return null; 
  }

  return (
    <View
      key={strategy.strategyId}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
      }}>
      <Image
        style={{
          height: 70,
          width: 70,
          margin: 10,
          borderRadius: 25,
        }}
        source={typeof(strategy.image) === 'string' ? {uri: strategy.image} : strategy.image}
        alt={strategy.title}
      />

      <Text
        style={{ fontFamily: "Inter", fontSize: 20, marginHorizontal: 4, flex: 1}}>
        {strategy.title}
      </Text>
      
      <BookmarkStrategy key={strategy.strategyId} strategy_id={strategy.strategyId}/>
    </View>
  )
}

export default StrategyCard