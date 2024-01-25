
import { Redirect } from 'expo-router'
import React from 'react'
import { userStore } from '../utils/stores/userStore'


const AppEntry = () => {
  const authUser = userStore((state) => state.authUser);
  const userDoc = userStore((state) => state.userDoc);

  if (!authUser) {
    return (
      <Redirect  href={'/(auth)/mainLogin'} />
    );
  }

  if (!userDoc) {
    return (
      <Redirect  href={'/(auth)/onboardingUsername'} />
    );
  }

    return (
      <Redirect  href={'/(user)/(feed)/userFeed'}/>
    );
}

export default AppEntry
