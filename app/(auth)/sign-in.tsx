import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import SignInForm from "@components/SignInForm";
import GoogleButtonSvg from "@components/googleButton";

const SignIn = () => {
  return (
    <ScrollView style={styles.safeView}>
      <SignInForm />

      <GoogleButtonSvg buttonType="in" />
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});
