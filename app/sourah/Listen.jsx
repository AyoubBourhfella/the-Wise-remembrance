import { View, Image, ScrollView, Alert, BackHandler, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Picker } from 'react-native-ui-lib';
import DetailsBackground from '../../components/DetailsBackground';
import { useFocusEffect } from '@react-navigation/native';
import { useSourahListenContext } from '../../context/SourahListenProvider';
import images from '../../constants/images';
import SourahListenInfo from '../../components/SourahListenInfo';
import Player from '../../components/Player';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import ConfirmComponent from '../../components/ConfirmComponent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Listen = () => {
    const { selectedListenSourah, setSelectedListenSourah } = useSourahListenContext();
    const { t } = useTranslation();
    const [options, setOptions] = useState([
        { label: '30min', value: '30' },
        { label: '1h', value: '60' },
        { label: '2h', value: '120' },
        { label: t('without'), value: 'without', isSelected: true }
    ]);
    const [selectedOption, setSelectedOption] = useState('without');
    const [alertVisible, setAlertVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [text, setText] = useState(t('confirmclose'));
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const checkTimeout = () => {
            if (selectedOption !== 'without') {
                const duration = Number(selectedOption) * 60000;
                console.log(duration);
                const timer = setTimeout(() => {
                    showAlert();
                }, duration);

                setTimeoutId(timer);
            }
        };

        checkTimeout();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [selectedOption]);

    const showAlert = () => {
        setAlertVisible(true);

        const startTime = Date.now();
        const interval = setInterval(() => {
            const secondsRemaining = 10 - Math.floor((Date.now() - startTime) / 1000);
            if (secondsRemaining <= 0) {
                clearInterval(interval);
                onClose();
            } else {
                setText(t('confirmclose') + ' ' + secondsRemaining);
            }
        }, 1000);

        setIntervalId(interval);
    };

    const onConfirm = () => {
        setAlertVisible(false);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (intervalId) {
            clearInterval(intervalId);
        }
    };

    const onClose = () => {
        if (Platform.OS === 'android') {
            router.dismissAll(); // If you need to navigate or close modals
            BackHandler.exitApp(); // Attempt to close the app
        }

    };

    return (
        <DetailsBackground>
            <ConfirmComponent disabled={false} visible={alertVisible} onClose={onClose} onConfirm={onConfirm} text={text} />
            <View className="h-full flex flex-col justify-center relative mx-8">
                <View className="h-2/5 pt-5">
                    <Image source={images.listen} resizeMode='contain' className="w-full h-full " />
                </View>
                <View className="flex items-center flex-row justify-center ">
                <MaterialCommunityIcons name="timer-sand" size={20} style={{marginHorizontal:10}} color="#fff8" />
                    <Picker
                        style={{ fontFamily: 'Poppins-Regular' }}
                        spellCheck={false}
                        itemStyle={{ fontFamily: 'Poppins-Bold' }}
                        selectionColor={"#FFF8"}
                        placeholderTextColor={"#FFF8"}
                        labelColor={'#fff8'}
                        color={'#fff8'}
                        value={selectedOption}
                        items={options}
                        valueExtractor={(item) => item.value}
                        onChange={(item) => setSelectedOption(item)}
                        
                    />
                </View>
                <ScrollView>
                    <View className="h-2/3 mb-auto">
                        <SourahListenInfo data={selectedListenSourah} />
                        <Player data={selectedListenSourah} />
                    </View>
                </ScrollView>
            </View>
        </DetailsBackground>
    );
};

export default Listen;
