import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import GradientBackground from '../../../components/GradientBackground'
import DrawerTogler from './../../../components/DrawerTogler';
import Timer from './../../../components/Timer';
import DayPrayers from '../../../components/DayPrayers';
import { Ionicons } from '@expo/vector-icons';
const PrayerTime = () => {
  const screenHeight = Dimensions.get('window').height;
  const navbarHeight = 90;
  const bottomMargin = 20;
  const contentHeight = screenHeight - navbarHeight - bottomMargin;
  
  return (
    <GradientBackground>
      <View className="h-full  flex flex-col relative mx-8" style={{ height: contentHeight }}>
        <DrawerTogler />
        
        <View className="flex flex-col justify-center items-center flex-grow">
          <Timer />
          <DayPrayers />
        </View>
      </View>
    </GradientBackground>

  )
}

export default PrayerTime