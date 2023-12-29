import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Tabs } from "expo-router";
import { CustomTabs } from "@components/CustomBottomTabs";

const UserLayout = () => {
  const { user } = userStore((state) => state);

  if (!user) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(feed)"
        options={{
          title: "Feed",
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="(de-escalation)"
        options={{
          title: "Helpful\nTips",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default UserLayout;
