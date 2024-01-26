import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Stack, router } from "expo-router";
import { View } from "react-native";

const AuthLayout = () => {
  return (
    <View 
      style={{flex: 1}}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}>
      </Stack>
    </View>
  );
};

export default AuthLayout;
