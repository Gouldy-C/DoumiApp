import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect} from "expo-router";
import { TopTabBar } from "@components/CustomTopTabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserFeed from "./userFeed";
import FavoritePosts from "./favoritePosts";
import UserPosts from "./userPosts";
import { Dimensions, View } from "react-native";

const FeedLayout = () => {
  const { user } = userStore((state) => state);

  if (!user) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const TopTab = createMaterialTopTabNavigator();

  return (
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
          options={{ tabBarLabel: 'Feed' }}
        />
        <TopTab.Screen
          name="Favorites"
          component={FavoritePosts}
          options={{ tabBarLabel: 'Favorites' }}
        />
        <TopTab.Screen
          name="My Posts"
          component={UserPosts}
          options={{ tabBarLabel: 'My Posts' }}
        />
      </TopTab.Navigator>
    </View>
  );
};

export default FeedLayout;
