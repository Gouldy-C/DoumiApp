import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { Redirect } from "expo-router";
import { userStore } from "@utils/stores/userStore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { googleSignOut } from "@utils/auth/googleAuth";


const logout = async (user: FirebaseAuthTypes.User | null, setUser : (newUser: FirebaseAuthTypes.User | null) => void) => {
  if (user) {
    await googleSignOut();
    setUser(null);
  }
};

const UserLogout = () => {
  const { user, setUser } = userStore((state) => state);

  useLayoutEffect(() => {
    logout(user, setUser)
  }, []);

  return <Redirect href={"/"} />;
};

export default UserLogout;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
});
