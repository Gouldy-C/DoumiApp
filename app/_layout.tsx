import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useLoading } from '@utils/stores/loadingStore';
import { userStore } from '@utils/stores/userStore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useFonts } from 'expo-font';
import { Slot, SplashScreen} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { checkAndCreateFirestoreUser } from '@utils/firestore/firestoreFunctions';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {loading, setLoading} = useLoading((state) => state);
  const {user, setUser} = userStore((state) => state);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });


  // Handle user state changes
  async function userChange(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    console.log(user, 'layout user change');
    if (user) {
      await checkAndCreateFirestoreUser(user)
    }
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loading]);


  if (!loaded || loading) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
    <StatusBar style='dark' translucent={false} backgroundColor='transparent'/>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
          <Slot/>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
