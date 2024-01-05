import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Tabs } from "expo-router";
import { CustomTabs } from "@components/CustomBottomTabs";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

const AuthLayout = () => {
  const { user } = userStore((state) => state);

  if (user) {
    return <Redirect href={"/(user)/(feed)/userFeed"} />;
  }

  return (
    <View 
      style={{flex: 1}}>
      <Tabs 
        tabBar={(props) => <CustomTabs {...props} />}
        screenOptions={{headerShown: false}}>
        <Tabs.Screen
          name="sign-in"
          options={{
            title: "Sign In",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="login" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sign-up"
          options={{
            title: "Sign Up",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="arrowup" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default AuthLayout;
