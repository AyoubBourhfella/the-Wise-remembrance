import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const ThirdStep = () => {
    const { t } = useTranslation();
    const [gotPermission, setGotPermission] = useState(false);
    const [buttonText, setButtonText] = useState(t('allow'));
    const [gradientColors, setGradientColors] = useState(['#F2F2F2', '#cacaca']);

    const requestPermissions = async () => {
        // Request Location Permission
        let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
        console.log(locationStatus);
        if (locationStatus !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        await AsyncStorage.setItem('location', JSON.stringify(location));
        setGotPermission(true);
        setButtonText(t('continue'));
        setGradientColors(['#65D6FC', '#0DC7D2']);
    };

    const checkPermission = async () => {
        const storedLocation = await AsyncStorage.getItem('location');
        if (storedLocation) {
            setGotPermission(true);
            setButtonText(t('continue'));
            setGradientColors(['#65D6FC', '#0DC7D2']);
        } 
    };

    const handleClick = async () => {
        if (!gotPermission) {
            await requestPermissions();
        } else {
            router.push('/FourthStep');
        }
    };

  useEffect(() => {
        checkPermission();
    
  }, [])


    return (
        <GestureHandlerRootView>
            <ImageBackground source={images.back1} resizeMode='cover' style={{ flex: 1 }}>
                <Image source={images.circle} resizeMode='cover' className="w-full absolute top-0" />
                <SafeAreaView className="flex-1 ">
                  <View  className=" h-full flex flex-col justify-between  relative items-center  mx-5 ">
                    <View className="flex h-1/4 flex-row items-center justify-center">
                        <Image source={images.icon} resizeMode='contain' style={styles.icon} className="h-36 w-36" />
                        <Text className="text-white font-AlmendraBold text-xl right-6">{t('title')}</Text>
                    </View>

                    <View className="flex h-2/4 px-2  flex-col w-full items-center justify-evenly">
                        <Text className="text-white font-pregular text-center text-xl">{t('permission')}</Text>
                    </View>

                    <View className="flex px-5 flex-row justify-between fixed z-30 bottom-10 items-center mt-5">
                        <LinearGradient
                            colors={gradientColors}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            className="w-full p-4  rounded-lg"
                        >
                            <TouchableOpacity onPress={()=>{handleClick()}}>
                                <Text className="text-center text-white text-xl font-pbold">{buttonText}</Text>
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

export default ThirdStep;
