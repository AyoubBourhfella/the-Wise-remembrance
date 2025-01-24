import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { router } from 'expo-router';

const FinalStep = () => {
  const { t } = useTranslation();
  const handleClick = async () => {

    try {
      await AsyncStorage.setItem('hasBeenAsked', 'true');

      router.replace('/Home')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GestureHandlerRootView>
      <ImageBackground source={images.back1} resizeMode='cover' style={{ flex: 1 }}>
        <Image source={images.circle} resizeMode='cover' className="w-full absolute top-0" />
        <SafeAreaView className="flex-1 ">
          <View className=" h-full flex flex-col justify-between  relative items-center  mx-5 ">

            <View className="flex m-auto  flex-col items-center justify-center">
              <Image source={images.icon} resizeMode='contain' />
              <Text className="text-white font-AlmendraBold text-center text-2xl">{t('Alldone')}</Text>
            </View>



            <View className="flex px-5 flex-row justify-between fixed z-30 bottom-10 items-center mt-5">
              <LinearGradient
                colors={['#65D6FC', '#0DC7D2']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                className="w-full p-4  rounded-lg"
              >
                <TouchableOpacity onPress={handleClick}>
                  <Text className="text-center text-white text-xl font-pbold">{t('Start')}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};




export default FinalStep