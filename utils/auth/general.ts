import { googleSignOut } from "./googleAuth"
import auth from "@react-native-firebase/auth"

const CharacterArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

export const logout = async () => {
  try {
    await googleSignOut()
    await auth().signOut()
  } catch (error) {
    console.log(error);
  }
}

export const generateEmailVerificationCode = (): string => {
  let res = ''
  for (let i = 0; i < 8; i++){
    res = res + CharacterArray[Math.floor((Math.random() * CharacterArray.length))]
  }
  return res
}


