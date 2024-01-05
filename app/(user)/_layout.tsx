import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Tabs } from "expo-router";
import { CustomTabs } from "@components/CustomBottomTabs";
import Forum from '@assets/images/icons/forum.svg';

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
          tabBarIcon: (props) => <Forum color={props.color} />,
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          title: "New Post",
          //tabBarIcon: (props) => <MaterialIcons name="post-add" size={props.size} color={props.color}/>,
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
