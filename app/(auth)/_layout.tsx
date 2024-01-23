import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

const AuthLayout = () => {
  const { authUser } = userStore((state) => state);

  if (authUser) {
    return <Redirect href={"/(user)/(feed)/userFeed"} />;
  }

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
