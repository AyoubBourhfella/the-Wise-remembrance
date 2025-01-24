import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { useState, useCallback } from 'react'
import GradientBackground from '../../../components/GradientBackground'
import { useTranslation } from 'react-i18next';
import { Defs, Path, Rect, Svg, ClipPath, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import DrawerTogler from '../../../components/DrawerTogler';
const Tasbih = () => {
  const { t, i18n } = useTranslation();
  const screenHeight = Dimensions.get('window').height;
  const navbarHeight = 90;
  const bottomMargin = 20;
  const contentHeight = screenHeight - navbarHeight - bottomMargin;

  const [count, setCount] = useState(0);

  const handlePress = async () => {
    try {
      const newValue = count + 1;
      setCount(newValue);
      await AsyncStorage.setItem('count', JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
  }
  const getCounts = async () => {
    try {
      const value = await AsyncStorage.getItem('count');
      if (value !== null) {
        setCount(parseInt(value));
      }
    } catch (error) {
      console.log(error);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getCounts();
      return () => {
        // Cleanup code
      }
    }, [])
  )
  const resetCount = async () => {
    try {
      await AsyncStorage.removeItem('count');
      setCount(0);
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <GradientBackground>
      <View className="h-full flex flex-col relative mx-8" style={{ height: contentHeight }}>
        <View className="flex flex-row justify-between items-center">
          <DrawerTogler />
          <TouchableOpacity onPress={resetCount} className=" mt-5">
            <Text className="text-[#FFFFFF64] text-xl font-pmedium uppercase ">
              {t('reset')}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex h-full flex-col justify-evenly items-center">
          <Text className="text-8xl text-white p-5 font-psemibold">{count}</Text>
          <TouchableOpacity onPress={handlePress}>

            <Svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <G clip-path="url(#clip0_8_154)">
                <Path d="M26.5 53C25.8136 53 25.1554 52.7273 24.6701 52.242C24.1848 51.7567 23.9121 51.0985 23.9121 50.4121V2.58789C23.9121 1.90154 24.1848 1.2433 24.6701 0.757976C25.1554 0.272652 25.8136 0 26.5 0C27.1864 0 27.8446 0.272652 28.3299 0.757976C28.8152 1.2433 29.0879 1.90154 29.0879 2.58789V50.4121C29.0879 51.0985 28.8152 51.7567 28.3299 52.242C27.8446 52.7273 27.1864 53 26.5 53Z" fill="white" />
                <Path d="M50.4121 29.0879H2.58789C1.90154 29.0879 1.2433 28.8152 0.757976 28.3299C0.272652 27.8446 0 27.1864 0 26.5C0 25.8136 0.272652 25.1554 0.757976 24.6701C1.2433 24.1848 1.90154 23.9121 2.58789 23.9121H50.4121C51.0985 23.9121 51.7567 24.1848 52.242 24.6701C52.7273 25.1554 53 25.8136 53 26.5C53 27.1864 52.7273 27.8446 52.242 28.3299C51.7567 28.8152 51.0985 29.0879 50.4121 29.0879Z" fill="white" />
              </G>
              <Defs>
                <ClipPath id="clip0_8_154">
                  <Rect width="53" height="53" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>

          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  )
}

export default Tasbih