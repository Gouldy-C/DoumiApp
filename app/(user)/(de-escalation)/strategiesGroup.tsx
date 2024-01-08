import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { strategies } from "@constants/strategiesData";
import { useLocalSearchParams } from "expo-router";
import StrategyCard from "@components/StrategyCard";
import StrategyModal from "@components/StrategyModal";
import { Strategy } from "@utils/types/types";


const StrategiesGroup = () => {
  const params = useLocalSearchParams();
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

  if (params.category === 'All Strategies'){
    return(
      <ScrollView style={{ flex: 1 }}>
        {strategies
        .map((strategy, index) => (
          <Pressable
            style={{marginVertical: 14}}
            key={index}
            onPress={() => setSelectedStrategy(strategy)}
            >
            <StrategyCard strategy={strategy}/>
  
          </Pressable>
        ))}
        <StrategyModal selectedStrategy={selectedStrategy} setSelectedStrategy={setSelectedStrategy}/>
      </ScrollView>
    )
  }
  // else if (params.category === 'Bookmarked'){
  //   return(
  //     <Text>Bookmarked</Text>
  //   )
  // }
  else {
    return (
      <ScrollView style={{ flex: 1 }}>
        {strategies
        .filter((strategy) => strategy.categories.includes(params.category as string))
        .map((strategy, index) => (
          <Pressable
            style={{marginVertical: 14}}
            key={index}
            onPress={() => setSelectedStrategy(strategy)}
            >
            <StrategyCard strategy={strategy}/>
          </Pressable>
        ))}
        <StrategyModal selectedStrategy={selectedStrategy} setSelectedStrategy={setSelectedStrategy}/>
      </ScrollView>
    )
  }
};

export default StrategiesGroup;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
});
