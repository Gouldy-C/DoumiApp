import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import SignUpForm from "@components/SignUpForm";
import GoogleButton from "@components/GoogleButton";

const SignUp = () => {
  return (
    <ScrollView style={{flex: 1,}}>
      <SignUpForm />

      <GoogleButton />
    </ScrollView>
  );
};

export default SignUp
