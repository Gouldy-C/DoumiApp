import { Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import StrategyModal from "@components/StrategyModal";
import StrategiesGroupScroll from "@components/strategiesGroupScroll";
import { router, useLocalSearchParams } from "expo-router";
import StrategiesGroupHeader from "@components/StrategiesGroupHeader";
import { filterStrategies } from "@utils/strategiesFunctions";
import { userStore } from "@utils/stores/userStore";
import CloseXSvg from "@components/svg-components/closeXSvg";
import { LinearGradient } from "expo-linear-gradient";


const StrategiesGroup = () => {
  const params = useLocalSearchParams()
  const catIndex = params.catIndex === "Bookmarked" ? params.catIndex as "Bookmarked" : Number(params.catIndex)
  const bookmarkFlag = catIndex === "Bookmarked"
  const bookmarkedStrategies = userStore((state) => state.userDoc?.bookmarkedStrategies)
  const [selectedStrategyIndex, setSelectedStrategyIndex] = useState<number | null>(null);
  const filteredStrategies = filterStrategies(catIndex, bookmarkedStrategies!)
  
  const backToStrategiesNav = () => {
    router.push('/(user)/(de-escalation)/strategiesNav')
  }


  return(
    <ScrollView contentContainerStyle={{minHeight: '100%', backgroundColor: 'white'}}>
        {!bookmarkFlag ? 
          <StrategiesGroupHeader groupIndex={catIndex} variant="back"/>
          :
          <LinearGradient
          start={{x: 0, y: 0.0}}
          end={{x: 1, y: 0.0}}
          colors={['#F6E9FF', '#FFEAFA']}
          style={{alignItems: 'center', flexDirection: 'row', paddingHorizontal:16, paddingVertical: 12}}>
            <Pressable onPress={backToStrategiesNav} style={{paddingHorizontal:16, paddingVertical: 12}}>
              <CloseXSvg height={22} width={22} color={'#424052'} scale={1}/>
            </Pressable>
            <Text style={{textAlign: 'center', fontSize: 32, flex: 1}}>
              Saved Strategies
            </Text>
          </LinearGradient>
        }
        {filteredStrategies.length === 0 && bookmarkFlag ?
          <>
            <Text style={{textAlign: 'center', fontSize: 28, marginVertical: 20, paddingHorizontal: 18}}>
              No Strategies Saved!
            </Text>
            <Text style={{textAlign: 'center', fontSize: 18, marginVertical: 20, paddingHorizontal: 18}}>
              Bookmark some strategies and you will be able to see those here.
            </Text>
          </>
          :
          <>
            <StrategiesGroupScroll
              setSelectedStrategyIndex={setSelectedStrategyIndex}
              filteredStrategies={filteredStrategies}
              />
            <StrategyModal selectedStrategyIndex={selectedStrategyIndex} setSelectedStrategyIndex={setSelectedStrategyIndex} filteredStrategies={filteredStrategies}/>
          </>
        }
        {!bookmarkFlag && <StrategiesGroupHeader groupIndex={catIndex} variant="next"/>}
    </ScrollView>
  )
}

export default StrategiesGroup;
