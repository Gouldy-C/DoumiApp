import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import SignInForm from "@components/SignInForm";
import GoogleButton from "@components/GoogleButton";

const SignIn = () => {
  return (
    <ScrollView style={{flex: 1,}}>
      <SignInForm />

        <GoogleButton/>
    </ScrollView>
  );
};

export default SignIn;
