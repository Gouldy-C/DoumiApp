import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import StrategyModal from "@components/StrategyModal";
import StrategiesGroupScroll from "@components/strategiesGroupScroll";
import { useLocalSearchParams } from "expo-router";
import StrategiesGroupHeader from "@components/StrategiesGroupHeader";
import AgitatedBehavior from '@assets/images/Agitated-Behavior.png'
import { filterStrategies } from "@utils/strategiesFunctions";
import { userStore } from "@utils/stores/userStore";


const StrategiesGroup = () => {
  const params = useLocalSearchParams()
  const {userDoc} = userStore((state) => state)
  const [selectedStrategyIndex, setSelectedStrategyIndex] = useState<number | null>(null);
  const filteredStrategies = filterStrategies(Number(params.index), userDoc?.bookmarkedStrategies!)


  return(
    <ScrollView contentContainerStyle={{minHeight: '100%', backgroundColor: 'white'}}>
        <StrategiesGroupHeader groupIndex={Number(params.index)} image={AgitatedBehavior} variant="back"/>
        {filteredStrategies.length === 0 ?
          <>
            <Text style={{textAlign: 'center', fontSize: 28, marginVertical: 20, paddingHorizontal: 15}}>
              No Strategies Bookmarked!
            </Text>
            <Text style={{textAlign: 'center', fontSize: 18, marginVertical: 20, paddingHorizontal: 15}}>
              Bookmark some strategies and you will be able to see all of those here.
            </Text>
          </>
          :
          <>
            <StrategiesGroupScroll 
              groupIndex={Number(params.index)} 
              setSelectedStrategyIndex={setSelectedStrategyIndex}
              />
            <StrategyModal selectedStrategyIndex={selectedStrategyIndex} setSelectedStrategyIndex={setSelectedStrategyIndex} filteredStrategies={filteredStrategies}/>
          </>
        }
        <StrategiesGroupHeader groupIndex={Number(params.index)} image={AgitatedBehavior} variant="next"/>
    </ScrollView>
  )
}

export default StrategiesGroup;
