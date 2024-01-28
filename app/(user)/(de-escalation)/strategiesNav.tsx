import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { strategyCatagories } from "@constants/strategiesData/strategyCatagories";
import { router } from "expo-router";
import { getColor } from "@utils/stylingFunctions";
import BookmarkedSvg from "@components/svg-components/bookmarkedSvg";

const DeEscalationPage = () => {

  const bookmarkedRoute = () => {
    router.push({
      pathname: "/(user)/(de-escalation)/strategiesGroup",
      params: { catIndex: "Bookmarked" },
    })
  }


  return (
    <View style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "500",
          paddingVertical: 12,
          paddingHorizontal: 16,
          textAlign: "center",
        }}>
        Strategies
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "400",
            paddingBottom: 5,
            paddingVertical: 8,
            paddingHorizontal: 20,
            textAlign: "center",
            marginBottom: 18,
          }}>
          Explore ways to support your loved one's dementia experience.
        </Text>

        <Pressable
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '90%',
            height: 48,
            borderRadius: 40,
            backgroundColor: '#EDF1FF',
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            gap: 10,
            marginBottom: 20,
          }}
          onPress={bookmarkedRoute}
        >
          <BookmarkedSvg height={20} width={20} color={'#5049A4'} scale={0.70}/>

          <Text
            style={{
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
            color: '#5049A4',
            }}
          >
            View Saved
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >


          {strategyCatagories.map((strategyCat, index) => (
            <Pressable
              key={index}
              style={{
                borderRadius: 24,
              }}
              onPress={() =>
                router.push({
                  pathname: "/(user)/(de-escalation)/strategiesGroup",
                  params: { catIndex: index },
                })
              }>
              <View
                style={{
                  elevation: 6,
                  flex: 1,
                  width: 160,
                  padding: 12,
                  alignItems: "center",
                  backgroundColor: getColor(index),
                  borderRadius: 24,
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "600",
                    paddingHorizontal:2,
                    paddingBottom: 8,
                    textAlign: "center",
                    color: "#ffffff",
                  }}>
                  {strategyCat.title}
                </Text>

                <Image
                  style={{
                    height: 95,
                    width: 95,
                    borderRadius: 500,
                  }}
                  source={strategyCat.image}
                  alt={strategyCat.title}
                />
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
    flexBasis: "auto",
    backgroundColor: "white",
  },
});
