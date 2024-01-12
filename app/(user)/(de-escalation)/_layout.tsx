import React from "react";
import { userStore } from "@utils/stores/userStore";
import { Redirect, Stack} from "expo-router";
import { View } from "react-native";


const StrategiesNav = () => {
  const { user } = userStore((state) => state);

  if (!user) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <View style={{flex: 1}}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      <Stack.Screen 
        name="strategiesNav"
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="strategiesGroup"
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
    </View>
  );
};

export default StrategiesNav