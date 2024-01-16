import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Strategy } from '@utils/types/types'



const StrategyCard = ({strategy} : {strategy : Strategy}) => {
  return (
    <View
      style={{
        overflow:"hidden",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
      }}>
      {/* <Image
        style={{}}
        source={strategy.image}
        placeholder={'placeholder'}
        contentFit="cover"
        transition={1000}
      /> */}
      <Text
        style={{
          padding: 20,
          marginStart: 10,
          fontSize: 20,
          height: 100,
          textAlign: "center",
          textAlignVertical: "center",
        }}>
        Image
      </Text>
      <View style={{}} >
        <Text
          style={{ fontSize: 22, fontWeight: "500", marginLeft: 10}}>
          {strategy.title}
        </Text>
      </View>
    </View>
  )
}

export default StrategyCard