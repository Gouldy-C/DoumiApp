import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useLoading } from '@utils/stores/loadingStore';
import { userStore } from '@utils/stores/userStore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, router} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore'


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loading = useLoading((state) => state.loading)
  const setLoading = useLoading((state) => state.setLoading)
  const setAuthUser = userStore((state) => state.setAuthUser)
  const setUserDoc = userStore((state) => state.setUserDoc)
  const colorScheme = useColorScheme()
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // setUserDoc(null)
  // setAuthUser(null)
  // auth().signOut()

  function userChange(user: FirebaseAuthTypes.User | null) {
    setAuthUser(user)
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserDoc({
              authProvider: documentSnapshot.get('authProvider'),
              createdTime: documentSnapshot.get('createdTime'),
              displayName: documentSnapshot.get('displayName'),
              email: documentSnapshot.get('email'),
              emailVerified: documentSnapshot.get('emailVerified'),
              lastSignInTime: documentSnapshot.get('lastSignInTime'),
              lastUpdatedTime: documentSnapshot.get('lastUpdatedTime'),
              phoneNumber: documentSnapshot.get('phoneNumber'),
              photoURL: documentSnapshot.get('photoURL'),
              providerId: documentSnapshot.get('providerId'),
              uid: documentSnapshot.get('uid'),
              bookmarkedStrategies: documentSnapshot.get('bookmarkedStrategies'),
              bookmarkedPosts: documentSnapshot.get('bookmarkedPosts'),
            })
          }
          else {
            setUserDoc(null)
          }
        }, err => {console.log(err)})
    }
    setLoading(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userChange);
    return subscriber
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
    else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [loaded, loading]);

  if (!loaded || loading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
    <StatusBar style='dark' translucent={true} backgroundColor='transparent'/>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
          <Slot/>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
