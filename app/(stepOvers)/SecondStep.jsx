import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedControl } from 'react-native-ui-lib';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
const SecondStep = () => {
  const langs = [{ "label": "English", "value": "en" }, { "label": "العربية", "value": "ar" }, { "label": "French", "value": "fr" }];
  const { t, i18n } = useTranslation();

  const selectdLang = langs.findIndex(lang => lang.value === i18n.language);

  return (
    <GestureHandlerRootView>
      <ImageBackground source={images.back1} resizeMode='cover' style={{ flex: 1 }}>
        <Image source={images.circle} resizeMode='cover' className="w-full absolute top-0" />
        <SafeAreaView className="flex-1 ">
          <View className=" h-full flex flex-col justify-between  relative items-center  mx-5 ">
            <View className="flex h-1/4 flex-row items-center justify-center">
              <Image source={images.icon} resizeMode='contain' style={styles.icon} className="h-36 w-36" />
              <Text className="text-white font-AlmendraBold text-xl right-6">{t('title')}</Text>
            </View>

            <View className="flex h-2/4 px-2  flex-col w-full items-center justify-evenly">
              <Text className="text-xl text-white font-pmedium">{t('chooseLang')}</Text>
              <SegmentedControl segments={langs}
                activeColor="#65D6FC"
                activeBackgroundColor="transparent"
                className="bg-transparent w-full py-2 font-AlmendraBold text-xl"
                segmentLabelStyle={{ fontFamily: 'Almendra-Bold' }}
                onChangeIndex={(index) => i18n.changeLanguage(langs[index].value)}
                inactiveColor='#cccccc'
                backgroundColor='transparent'
                borderRadius={8}
                containerStyle={{ padding: 10, backgroundColor: 'transparent' }}
                initialIndex={selectdLang}
                outlineColor='#65D6FC'

              />
            </View>

            <View className="flex px-5 flex-row justify-between fixed z-30 bottom-10 items-center mt-5">
              <LinearGradient
                colors={['#65D6FC', '#0DC7D2']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                className="w-full p-4  rounded-lg"
              >
                <TouchableOpacity onPress={() => { router.push('/ThirdStep') }}>

                  <Text className="text-center text-white text-xl font-pbold">{t('continue')}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 144, // Same as h-36
    height: 144, // Same as w-36
  },
});

export default SecondStep;
