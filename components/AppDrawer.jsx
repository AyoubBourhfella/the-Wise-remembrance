import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import DetailsBackground from './DetailsBackground';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import images from '../constants/images';
import { router } from 'expo-router';

const AppDrawer = ({ drawerPosition, navigation, ...props }) => {
  const { t } = useTranslation();

  return (
    <DetailsBackground className="flex-1 rounded-r-3xl">
      <View
        className="backdrop-blur-xl w-f py-6 flex flex-col items-center  blur-xl h-full m-5 shadow-2xl p-4"
        style={{
          top: drawerPosition === 'left' ? 0 : 'auto',
          bottom: drawerPosition === 'bottom' ? 0 : 'auto',
          left: drawerPosition === 'left' ? 0 : 'auto',
          right: drawerPosition === 'right' ? 0 : 'auto',
        }}
      >
        <View className="w-full">
          <Image source={images.QuranBook} resizeMode='contain' className="h-52 w-full mx-auto" />
          <Text className="text-center text-2xl font-AmiriBold pt-2 text-white">{t('title')}</Text>
          <Text className="text-center text-base font-pthin text-white/60">{t('by')}</Text>
        </View>
        <ScrollView className="flex-1 mt-5 mx-auto w-full">
          <View style={{  justifyContent: 'center', alignItems: 'center' }} className="bg-white/10  rounded-2xl p-4 ">
            <TouchableOpacity
              className=" w-full text-center justify-center py-2 my-4"
              style={{ flexDirection: 'row', alignItems: 'center'}}
              onPress={() => router.navigate('/Home')}
            >
              <Text className="font-pmedium" style={{ color: 'white'}}>{t('Home')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className=" w-full text-center justify-center py-2 my-4"

              style={{ flexDirection: 'row', alignItems: 'center'}}
              onPress={() => router.navigate('/Settings')}
            >
              <Text className="font-pmedium" style={{ color: 'white' }}>{t('Settings')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className=" w-full text-center justify-center py-2 my-4"

              style={{ flexDirection: 'row', alignItems: 'center'}}
              onPress={() => router.navigate('/About')}
            >
              <Text className="font-pmedium" style={{ color: 'white' }}>{t('About')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </DetailsBackground>
  );
};

export default AppDrawer;
