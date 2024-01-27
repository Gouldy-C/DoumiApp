import React from "react";
import { Stack} from "expo-router";
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
