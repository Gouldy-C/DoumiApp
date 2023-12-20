import { googleSignOut } from "./googleAuth"
import auth from "@react-native-firebase/auth"



export const logout = async () => {
  try {
    await googleSignOut()
    await auth().signOut()
  } catch (error) {
    console.log(error);
  }
}