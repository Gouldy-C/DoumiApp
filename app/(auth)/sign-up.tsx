import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import SignUpForm from "@components/SignUpForm";
import GoogleButton from "@components/GoogleButton";

const SignUp = () => {
  return (
    <ScrollView style={styles.safeView}>
      <SignUpForm />

      <GoogleButton buttonType="up" />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});
