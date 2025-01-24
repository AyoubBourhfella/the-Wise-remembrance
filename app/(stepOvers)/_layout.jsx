
import React from 'react'
import { Stack } from 'expo-router'





const RootLayout = () => {




  return (
    <Stack screenOptions={{ headerShown: false, animation: 'simple_push' }}>
      <Stack.Screen name="FirstStep" />
      <Stack.Screen name="SecondStep" />
      <Stack.Screen name="ThirdStep" />
      <Stack.Screen name="FourthStep" />
      <Stack.Screen name="FinalStep" />
    </Stack>
  )
}

export default RootLayout