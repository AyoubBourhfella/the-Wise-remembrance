// RootLayout.js
import React, { useEffect, useCallback } from 'react';
import { SplashScreen as ExpoSplashScreen, Stack, useFocusEffect } from 'expo-router';
import { useFonts } from 'expo-font';
import { I18nextProvider } from 'react-i18next';
import i18n from '../constants/i18n';
import { GlobalProvider } from '../context/GlobalProvider';
import { SourahProvider } from '../context/SourahProvider';
import { SourahListenProvider } from '../context/SourahListenProvider';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Audio } from 'expo-av';

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "quran": require("../assets/fonts/quran.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Almendra-Bold": require("../assets/fonts/Almendra-Bold.ttf"),
    "Almendra-BoldItalic": require("../assets/fonts/Almendra-BoldItalic.ttf"),
    "Almendra-Italic": require("../assets/fonts/Almendra-Italic.ttf"),
    "Almendra-Regular": require("../assets/fonts/Almendra-Regular.ttf"),
    "Amiri-Bold": require("../assets/fonts/Amiri-Bold.ttf"),
    "Amiri-BoldItalic": require("../assets/fonts/Amiri-BoldItalic.ttf"),
    "Amiri-Italic": require("../assets/fonts/Amiri-Italic.ttf"),
    "Amiri-Regular": require("../assets/fonts/Amiri-Regular.ttf"),
  });

  useEffect(() => {
    // Configure audio for background playback
    Audio.setAudioModeAsync({
        staysActiveInBackground: true,

        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
        
    });
}, []);
 
  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
    }
    if (error) {
      throw error;
    }
  }, [fontsLoaded, error]);



  if (!fontsLoaded) {
    return null; 
  }

  return (
    <RootSiblingParent>
      <I18nextProvider i18n={i18n}>
        <GlobalProvider>
          <SourahProvider>
            <SourahListenProvider>
              <Stack screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(drawer)" />
                <Stack.Screen name="(stepOvers)" />
                <Stack.Screen name="sourah/Sourah" options={{ animation: 'slide_from_bottom' }} />
              </Stack>
            </SourahListenProvider>
          </SourahProvider>
        </GlobalProvider>
      </I18nextProvider>
    </RootSiblingParent>
  );
};


export default RootLayout;
