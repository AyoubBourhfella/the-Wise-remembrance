import React, { useRef, useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FirstStep = () => {
  const { t } = useTranslation();

  const imageTranslateY = useRef(new Animated.Value(200)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const checkIfAsked = async () => {
        const value = await AsyncStorage.getItem('hasBeenAsked')
        if (value !== null) {
            setRedirectTo('/Home')
        }
    }
    checkIfAsked()
}, [])
  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      
      Animated.timing(imageTranslateY, {
        toValue: 0, // Move the image back to its place
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1, // Fade in the text
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1, // Fade in the button
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground source={images.back1} resizeMode='cover' style={{ flex: 1 }}>
      <Image source={images.circle} resizeMode='cover' className="w-full absolute top-0" />
      <SafeAreaView className="flex-1 ">
        <View className="h-full flex flex-col justify-between relative items-center mx-5 ">
          <Animated.View style={{ transform: [{ translateY: imageTranslateY }] }} className="flex h-1/4 flex-row items-center justify-center">
            <Image source={images.icon} resizeMode='contain' style={styles.icon} className="h-36 w-36" />
            <Text  className="text-white font-AlmendraBold text-xl right-6">{t('title')}</Text>
          </Animated.View>

          <Animated.View style={{ opacity: textOpacity }} className="flex h-2/4 flex-col w-full items-center justify-center">
            <ScrollView>
              <Text className="font-pregular text-lg text-center text-white">{t('description')}</Text>
            </ScrollView>
          </Animated.View>

          <Animated.View style={{ opacity: buttonOpacity }} className="flex px-5 flex-row justify-between fixed z-30 bottom-10 items-center mt-5">
            <LinearGradient
              colors={['#65D6FC', '#0DC7D2']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="w-full p-4 rounded-lg"
            >
              <TouchableOpacity onPress={() => { router.push('/SecondStep') }}>
                <Text className="text-center text-white text-xl font-pbold">{t('continue')}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 144, // Same as h-36
    height: 144, // Same as w-36
  },
});

export default FirstStep;
