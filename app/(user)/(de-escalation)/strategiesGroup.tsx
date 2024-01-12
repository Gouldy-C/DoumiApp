import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import StrategyModal from "@components/StrategyModal";
import StrategiesGroupScroll from "@components/strategiesGroupScroll";
import { useLocalSearchParams } from "expo-router";
import StrategiesGroupHeader from "@components/StrategiesGroupHeader";
import AgitatedBehavior from '@assets/images/Agitated-Behavior.png'
import { filterStrategies } from "@utils/strategiesFunctions";


const StrategiesGroup = () => {
  const params = useLocalSearchParams();
  const [selectedStrategyIndex, setSelectedStrategyIndex] = useState<number | null>(null);
  const filteredStrategies = filterStrategies(Number(params.index))


  return(
    <ScrollView 
      style={{}}
    >
      <StrategiesGroupHeader groupIndex={Number(params.index)} image={AgitatedBehavior} variant="back"/>

      <StrategiesGroupScroll 
        groupIndex={Number(params.index)} 
        setSelectedStrategyIndex={setSelectedStrategyIndex}
      />

      <StrategiesGroupHeader groupIndex={Number(params.index)} image={AgitatedBehavior} variant="next"/>

      <StrategyModal selectedStrategyIndex={selectedStrategyIndex} setSelectedStrategyIndex={setSelectedStrategyIndex} filteredStrategies={filteredStrategies}/>
    </ScrollView>
  )
}

export default StrategiesGroup;

const styles = StyleSheet.create({

});
