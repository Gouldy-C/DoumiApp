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
          headerShown: true,
          title: 'Strategies Groups'
        }}
      />
      <Stack.Screen
        name="strategiesGroups"
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
          title: 'Strategies'
        }}
      />
    </Stack>
    </View>
  );
};

export default StrategiesNav