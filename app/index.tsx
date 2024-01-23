
import { Redirect } from 'expo-router'
import React from 'react'
import { userStore } from '../utils/stores/userStore'
import { useLoading } from '../utils/stores/loadingStore'


const AppEntry = () => {
  const {loading} = useLoading((state) => state);
  const {authUser} = userStore((state) => state);

  
  if (loading) return null;

  if (!authUser) {
    return (
      <Redirect  href={'/(auth)/mainLogin'} />
    );
  }

  return (
    <Redirect  href={'/(user)/(feed)/userFeed'}/>
  );
}

export default AppEntry
