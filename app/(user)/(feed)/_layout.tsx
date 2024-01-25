import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect } from "expo-router";
import { TopTabBar } from "@components/CustomTopTabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserFeed from "./userFeed";
import FavoritePosts from "./savedPosts"
import { Dimensions, View, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import DoumiImageLogo from "@components/svg-components/doumiImageLogo";


const FeedLayout = () => {
  const authUser = userStore((state) => state.authUser);
  const userDoc = userStore((state) => state.userDoc);
  
  if (!authUser || !userDoc) {
    return <Redirect href={"/(auth)/mainLogin"} />;
  }

  const TopTab = createMaterialTopTabNavigator();

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{justifyContent: 'center', alignItems:'center', flexDirection: 'row', gap: 10, marginTop: 10}}>
        <DoumiImageLogo color='white' height={50} width={50} />
        <LinearGradient
              start={{x: 0, y: 0.0}}
              end={{x: 1, y: 0.0}}
              colors={['#5049A4', '#385592']}
              style={styles.button}>
        <TextInput
          placeholder='Search tags'
          placeholderTextColor= 'white'
          style={{color: 'white', fontSize: 20}}
        >
        </TextInput>
        </LinearGradient>
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
    borderRadius: 15,
    elevation: 8,
    paddingVertical: 10,
    paddingLeft: 10, 
    width: '80%',
    flexDirection: 'row'
  },
})