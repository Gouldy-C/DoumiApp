import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { strategies } from "@constants/strategiesData";
import { useLocalSearchParams } from "expo-router";
import StrategyCard from "@components/StrategyCard";

const StrategiesGroup = () => {
  const params = useLocalSearchParams();


  if (params.category === 'All Strategies'){
    return(
      <ScrollView style={{ flex: 1 }}>
        {strategies
        .map((strategy, index) => (
          <Pressable
            style={{marginVertical: 14}}
            key={index}
            onPress={() => console.log('strategy: ' + strategy.uuid)}
            >
            <StrategyCard strategy={strategy}/>
  
          </Pressable>
        ))}
      </ScrollView>
    )
  }
  else if (params.category === 'Bookmarked'){
    return(
      <Text>Bookmarked</Text>
    )
  }
  else {
    return (
      <ScrollView style={{ flex: 1 }}>
        {strategies
        .filter((strategy) => strategy.categories.includes(params.category as string))
        .map((strategy, index) => (
          <Pressable
            style={{marginVertical: 14}}
            key={index}
            onPress={() => console.log('strategy: ' + strategy.uuid)}
            >
            <StrategyCard strategy={strategy}/>
          </Pressable>
        ))}
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
