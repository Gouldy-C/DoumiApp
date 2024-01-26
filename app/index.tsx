
import { Redirect } from 'expo-router'
import React from 'react'
import { userStore } from '../utils/stores/userStore'
import { useLoading } from '../utils/stores/loadingStore'


const AppEntry = () => {
  const {loading} = useLoading((state) => state);
  const {user} = userStore((state) => state);

  
  if (loading) return null;

  if (!user) {
    return (
      <Redirect  href={'/'}/>
    );
  }

  return (
    <Redirect  href={'/(user)/(feed)/userFeed'}/>
  );
}

export default AppEntry
