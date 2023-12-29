import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect} from "expo-router";
import { TopTabBar } from "@components/CustomTopTabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserFeed from "./userFeed";
import FavoritePosts from "./favoritePosts";
import UserPosts from "./userPosts";
import { Dimensions } from "react-native";

const FeedLayout = () => {
  const { user } = userStore((state) => state);

  if (!user) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const TopTab = createMaterialTopTabNavigator();

  return (
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
        options={{ tabBarLabel: 'Home' }}
      />
      <TopTab.Screen
        name="Favorite"
        component={FavoritePosts}
        options={{ tabBarLabel: 'Favorite' }}
      />
      <TopTab.Screen
        name="My Posts"
        component={UserPosts}
        options={{ tabBarLabel: 'My Posts' }}
      />
    </TopTab.Navigator>
  );
};

export default FeedLayout;
