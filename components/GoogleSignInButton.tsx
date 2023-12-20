import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { userStore } from "@utils/stores/userStore";
import { googleSignIn } from "@utils/auth/googleAuth";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { checkAndCreateFirestoreUser } from "@utils/firestore/firestoreFunctions";

const GoogleSignInButton = () => {
  const { user, setUser } = userStore((state) => state);

  const handleGoogleSignIn = async () => {
    await googleSignIn()
  };

  return (
    <Pressable onPress={handleGoogleSignIn}>
      <Text style={styles.google}>Google</Text>
    </Pressable>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  google: {
    maxWidth: "80%",
    fontSize: 22,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 15,
    margin: 15,
    alignSelf: "center",
  },
});
