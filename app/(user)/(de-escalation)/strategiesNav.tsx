import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { strategyCatagories } from "@constants/strategiesData";
import { router } from "expo-router";
import { getColor } from "@utils/stylingFunctions";



const DeEscalationPage = () => {

  return (
    <View style={styles.safeView}>
      <Text
        style={{ fontSize: 32, fontWeight: "500", paddingVertical: 12, paddingHorizontal: 16, textAlign: 'center'}}>
        Strategies
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{ fontSize: 19, fontWeight: "400", paddingBottom: 5, paddingVertical: 8, paddingHorizontal: 20, textAlign: 'center', marginBottom: 18  }}>
          Explore ways to support your loved one's dementia experience.
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20}}>
          {strategyCatagories.map((strategy, index) => (
            <Pressable
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/(user)/(de-escalation)/strategiesGroup",
                  params: { index: index },
                })
              }>
                <View
                  style={{
                    flex: 1,
                    height: 172,
                    width: 160,
                    padding: 12,
                    alignItems: "center",
                    backgroundColor: getColor(index),
                    borderRadius: 24,
                    justifyContent: 'space-between',
                }}>
                  <Text
                    style={{ fontSize: 20, fontWeight: "700", paddingBottom: 5, textAlign: "center", color: '#ffffff',}}>
                    {strategy.title.toLocaleUpperCase()}
                  </Text>

                  {/* <Image
                    style={{}}
                    source={strategy.image}
                    placeholder={'placeholder'}
                    contentFit="cover"
                    transition={1000}
                  /> */}
                  <Text
                    style={{
                      fontSize: 20,
                      height: 90,
                      width: 90,
                      
                      textAlign: "center",
                      textAlignVertical: "center",
                      backgroundColor: '#ffffff',
                      borderRadius: 500,
                      color: '#000',
                    }}>
                    {strategy.image}
                  </Text>
                </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DeEscalationPage;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    flexBasis: 'auto',
  },
});
