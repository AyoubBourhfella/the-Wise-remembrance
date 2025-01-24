import { View, Image, Platform, Keyboard } from 'react-native';
import {useState, useEffect} from 'react';
import { Tabs } from 'expo-router';
import images from '../../../constants/images';
import Tabbar from '../../../components/Tabbar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
const TabIcon = ({ source, focused }) => {
  return (
    <View className="h-full w-full items-center justify-center">
      <Image source={source} resizeMode='contain' className={`w-8 h-8 ${focused ? 'opacity-100' : 'opacity-50'}`} />
    </View>
  );
};

const MainLayout = () => {
  
  return (
    
      <Tabs
        tabBar={(props) => <Tabbar {...props} />}
        screenOptions={{
          tabBarStyle: { backgroundColor: 'transparent', elevation: 0, shadowColor: 'transparent', borderTopWidth: 0, height: '100%' },
          headerShown: false,
          tabBarShowLabel: false,

        }}
      >
        <Tabs.Screen name="Home" options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color='#fff' name='home' focused={focused} source={images.home} TextContent='Home' />
        }} />
        <Tabs.Screen name="Quran" options={{
          title: 'Quran',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color='#fff' name='home' focused={focused} source={images.Quran} TextContent='Quran' />
        }} />
        <Tabs.Screen name="PrayerTime" options={{
          title: 'PrayerTime',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color='#fff' name='home' focused={focused} source={images.time} TextContent='PrayerTime' />
        }} />
        <Tabs.Screen name="Tasbih" options={{
          title: 'Tasbih',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color='#fff' name='home' focused={focused} source={images.tasbeeh} TextContent='Tasbih' />
        }} />
      </Tabs>
  );
};

export default MainLayout;
