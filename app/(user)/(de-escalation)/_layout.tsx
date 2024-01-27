import React from "react"
import {  Stack} from "expo-router";
import { View } from "react-native";




const StrategiesNav = () => {

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