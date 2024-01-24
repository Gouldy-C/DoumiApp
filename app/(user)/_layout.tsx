import React, { useEffect, useState } from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Tabs } from "expo-router";
import { CustomTabs } from "@components/CustomBottomTabs";
import ForumSvg from "@components/svg-components/forumSvg";
import NewPostsSvg from "@components/svg-components/newPostsSvg";
import SmallProfileSvg from "@components/svg-components/profileSvg";
import StrategiesSvg from "@components/svg-components/strategiesSvg";
import StrategiesFilledSvg from "@components/svg-components/strategiesFilledSvg";
import NewPostsFilledSvg from "@components/svg-components/newPostsFilledSvg";
import ForumFilledSvg from "@components/svg-components/forumFilledSvg";
import ProfileFilledSvg from "@components/svg-components/profileFilledSvg";
import { Keyboard, View } from "react-native";

const UserLayout = () => {
  const authUser = userStore((state) => state.authUser);
  
  if (!authUser) {
    return <Redirect href={"/(auth)/mainLogin"} />;
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
            tabBarIcon: (props) => (props.focused ? 
              <ForumFilledSvg color={props.color} height={31} width={32}/>
              :
              <ForumSvg color={props.color} height={31} width={32}/>
            )
          }}
        />
        <Tabs.Screen
          name="newPost"
          options={{
            title: "New Post",
            tabBarIcon: (props) => (props.focused ? 
              <NewPostsFilledSvg color={props.color} height={31} width={32}/>
              :
              <NewPostsSvg color={props.color} height={31} width={30}/>
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: (props) => (props.focused ? 
              <ProfileFilledSvg color={props.color} height={31} width={32} scale={1.18}/>
              :
              <SmallProfileSvg color={props.color} height={31} width={32} scale={1.18}/>
            )
          }}
        />
        <Tabs.Screen
          name="(de-escalation)"
          options={{
            title: "Strategies",
            tabBarIcon: (props) => (props.focused ? 
              <StrategiesFilledSvg color='#734595' height={31} width={32}/>
              :
              <StrategiesSvg color={props.color} height={31} width={32}/>
            )
          }}
        />
      </Tabs>
  );
};

export default UserLayout;
