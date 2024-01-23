import { userStore } from "@utils/stores/userStore"
import { googleSignOut } from "./googleAuth"
import auth from "@react-native-firebase/auth"
import { router } from "expo-router"
import { Keyboard } from "react-native"



export const logout = async () => {
  try {
    await googleSignOut()
    await auth().signOut()
  } catch (error) {
    console.log(error);
  }
}
