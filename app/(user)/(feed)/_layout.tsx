import React, { useState} from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect } from "expo-router";
import { TopTabBar } from "@components/CustomTopTabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserFeed from "./userFeed";
import FavoritePosts from "./savedPosts"
import { Dimensions, View, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import DoumiImageLogo from "@components/svg-components/doumiImageLogo";
import FilterSearch from "@components/svg-components/filterSvg";
import FilterPostsButton from "@components/FilterPostsButton";


const FeedLayout = () => {
  const [searchText, setSearchText] = useState('')
  const TopTab = createMaterialTopTabNavigator();

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{justifyContent: 'center', alignItems:'center', flexDirection: 'row', gap: 10, marginTop: 10, paddingBottom: 10}}>
        <DoumiImageLogo color='white' height={50} width={50} />
        <FilterPostsButton/>
      </View>

      <View style={{flex: 1}}>
        <TopTab.Navigator
          initialLayout={{
            width: Dimensions.get('window').width,
          }}
          tabBar={(props) => <TopTabBar {...props} />}
          screenOptions={{
          }}>
          <TopTab.Screen
            name="Feed"
            component={UserFeed}
            options={{ tabBarLabel: 'Latest' }}
          />
          <TopTab.Screen
            name="Saved"
            component={FavoritePosts}
            options={{ tabBarLabel: 'Saved' }}
          />
        </TopTab.Navigator>
      </View>
    </View>
  );
};

export default FeedLayout

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginVertical: 20,
    width: "80%",
    alignSelf: "center",
    paddingLeft: 1,
  },
  button: {
    borderRadius: 18,
    elevation: 8,
    paddingVertical: 10,
    paddingLeft: 10, 
    width: '80%',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})