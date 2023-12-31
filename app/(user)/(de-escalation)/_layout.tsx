import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect} from "expo-router";
import { TopTabBar } from "@components/CustomTopTabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions, View } from "react-native";
import DeEscalationFavorites from "./de-escalation-favorites";
import DeEscalationPage from "./de-escalation";

const HelpLayout = () => {
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
          name="DeEscalation"
          component={DeEscalationPage}
          options={{ tabBarLabel: 'DeEscalation' }}
        />
        <TopTab.Screen
          name="Favorites"
          component={DeEscalationFavorites}
          options={{ tabBarLabel: 'Favorites' }}
        />
      </TopTab.Navigator>
    </View>
  );
};

export default HelpLayout