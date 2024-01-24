import auth from '@react-native-firebase/auth'
import { router } from 'expo-router'

export const signUpEmailPassword = async (email : string, password : string): Promise<string|void> => { 
    await auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result){
          router.replace('/')
        }
        return
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use' || error.code === 'auth/invalid-email') {
          return 'Invalid Email or Password'
        }
        console.error(error);
      })
  }

export const signInEmailPassword = async (email : string, password : string): Promise<string|void> => { 
    await auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result){
          router.replace('/')
        }
        return
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use' || error.code === 'auth/invalid-email' || error.code === 'auth/invalid-password') {
          return('Invalid Email or Password');
        }
        console.error(error);
      })
  }