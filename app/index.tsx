
import { Redirect } from 'expo-router'
import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { userStore } from '../utils/stores/userStore';
import { useLoading } from '../utils/stores/loadingStore';


const AppEntry = () => {
  const {loading, setLoading} = useLoading((state) => state);
  const {user, setUser} = userStore((state) => state);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <Redirect  href={'/(auth)/sign-in'}/>
    );
  }

  return (
    <Redirect  href={'/(user)/feed'}/>
  );
}

export default AppEntry
