import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { getData, storeData } from '../../constants/db'; // Make sure this is the correct path
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router/build';

const FourthStep = ({ navigation }) => {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(0);
    const [buttonText, setButtonText] = useState(t('Download'));
    const [allowpassin, setAllowpassin] = useState(false);
    const [hasdownloaded ,setHasdownloaded] = useState(false);
    const [gradiantColors, setGradiantColors] = useState(['#F2F2F2', '#cacaca']);
    const [trigger , setTrigger] = useState(false);
    const apis = [
        { key: 'ar', value: 'https://api.alquran.cloud/v1/quran/ar' },
        { key: 'fr', value: 'https://api.alquran.cloud/v1/quran/fr.hamidullah' },
        { key: 'en', value: 'http://api.alquran.cloud/v1/quran/en.asad' }
    ];

    const fetchDataAndStore = async (url, language) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 200) {
                await storeData(data, language);
                setTrigger(!trigger);
                setProgress(prev => prev + (1 / (apis.length))); // Update progress
            }
        } catch (error) {
            console.error(`Error fetching data for ${language}:`, error);
        }
    };
    const check = async () => {
        try {
            const quranlangdownloaded = await AsyncStorage.getItem('quranlangdownloaded');
            if (quranlangdownloaded) {
                setHasdownloaded(true);
                setProgress(1)
                setButtonText(t('continue'));
                setGradiantColors(['#65D6FC', '#0DC7D2']);
            } else {
                setHasdownloaded(false);
            }
        } catch (error) {
            console.error("Error checking AsyncStorage:", error);
        }
    };
    
    useFocusEffect(
        useCallback(()=>{
            check();
        },[trigger])
        
    )
    const handleClick = async () => {
        if (hasdownloaded) {
            router.push('/FinalStep')
        } else {

            setButtonText(t('Downloading'));
            setProgress(0);

            for (const api of apis) {
                await fetchDataAndStore(api.value, api.key);
            }
            AsyncStorage.setItem('quranlangdownloaded', 'true');
            setHasdownloaded(true);
            setAllowpassin(true)
            setButtonText(t('continue'));
            setGradiantColors(['#65D6FC', '#0DC7D2'])
        }
    };

    return (
        <GestureHandlerRootView>
            <ImageBackground source={images.back1} resizeMode='cover' style={{ flex: 1 }}>
                <Image source={images.circle} resizeMode='cover' className="w-full absolute -top-56" />
                <SafeAreaView className="flex-1">
                    <View className="h-full flex flex-col justify-between relative items-center mx-5">
                        <View className="flex h-1/4 flex-row items-center justify-center">
                            <Image source={images.icon} resizeMode='contain' style={styles.icon} className="h-36 w-36" />
                            <Text className="text-white font-AlmendraBold text-xl right-6">{t('title')}</Text>
                        </View>

                        <View className="flex h-2/4 px-2 flex-col w-full items-center justify-evenly">
                            <Progress.Bar color="#65D6FC" animated={true} progress={progress} width={200} />
                            <Text className="text-white font-pregular text-center text-xl">{t('permissiontodownload')}</Text>
                        </View>

                        <View className="flex px-5 flex-row justify-between fixed z-30 bottom-10 items-center mt-5">
                            <LinearGradient
                                colors={gradiantColors}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                className="w-full p-4 rounded-lg"
                            >
                                <TouchableOpacity onPress={handleClick}>
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

export default FourthStep;
