import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { router } from 'expo-router';

export const signUpEmailPassword = async (email : string, password : string) => { 
    await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    })
  }

export const signInEmailPassword = async (email : string, password : string): Promise<string|FirebaseAuthTypes.UserCredential> => { 
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      return result
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use' || error.code === 'auth/invalid-email' || error.code === 'auth/invalid-password') {
        return('That invalid Email or Password!');
      }
      console.error(error);
    })
    return 'Login Error'
  }

  export const signOutUser = () => { 
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        router.replace('/(auth)/sign-in')
      })
      .catch((err) => console.log(err))
    }