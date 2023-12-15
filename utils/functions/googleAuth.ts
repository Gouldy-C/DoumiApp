import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { userStore } from '@utils/stores/userStore';


GoogleSignin.configure();

const { user, setUser} = userStore((state) => state)

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const newUser = await GoogleSignin.signIn();
    setUser(newUser);
    console.log(user);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};


export const googleSilentlySignIn = async () => {
  try {
    const newUser = await GoogleSignin.signInSilently();
    setUser(newUser)
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
    } else {
      // some other error
    }
  }
};

export const isGoogleSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  console.log(isSignedIn);
  //setState({ isLoginScreenPresented: !isSignedIn });
};


export const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  setUser(currentUser)
};


export const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
    setUser( null ); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};