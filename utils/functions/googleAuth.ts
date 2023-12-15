import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';


GoogleSignin.configure({
  webClientId: '799118216573-q97u3nk64ukhgol2nk3bh9nrnvaim03r.apps.googleusercontent.com',
});


export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const  googleUser = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(googleUser.idToken);
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential);
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
    const googleUser = await GoogleSignin.signInSilently()

    const googleCredential = auth.GoogleAuthProvider.credential(googleUser.idToken)
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential)
    
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
  return isSignedIn
  //setState({ isLoginScreenPresented: !isSignedIn });
};


export const getCurrentUser = async () => {
  const googleUser = await GoogleSignin.getCurrentUser();
  return(googleUser)
};


export const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
    // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};