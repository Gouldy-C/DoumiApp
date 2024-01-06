import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Tabs } from "expo-router";
import { CustomTabs } from "@components/CustomBottomTabs";
import ForumSvg from "@components/svg-components/forumSvg";
import NewPostsSvg from "@components/svg-components/newPostsSvg";
import SmallProfileSvg from "@components/svg-components/smallProfileSvg";
import StrategiesSvg from "@components/svg-components/strategiesSvg";

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
          tabBarIcon: (props) => <ForumSvg color={props.color} height={34} width={34}/>,
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          title: "New Post",
          tabBarIcon: (props) => <NewPostsSvg color={props.color} height={34} width={34}/>,
        }}
      />
      <Tabs.Screen
        name="(de-escalation)"
        options={{
          title: "Strategies",
          tabBarIcon: (props) => <StrategiesSvg color={props.color} height={34} width={34}/>
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: (props) => <SmallProfileSvg color={props.color} height={34} width={34}/>
        }}
      />
    </Tabs>
  );
};

export default UserLayout;
