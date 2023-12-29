import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Tabs } from "expo-router";
import { CustomTabs } from "@components/CustomBottomTabs";
import { AntDesign } from "@expo/vector-icons";

const AuthLayout = () => {
  const { user } = userStore((state) => state);

  if (user) {
    return <Redirect href={"/(user)/(feed)/userFeed"} />;
  }

  return (
    <Tabs tabBar={(props) => <CustomTabs {...props} />}>
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
  );
};

export default AuthLayout;
