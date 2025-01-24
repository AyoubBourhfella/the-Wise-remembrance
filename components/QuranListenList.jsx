import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import MyAlert from './MyAlert';
import { useTranslation } from 'react-i18next';
import SourahListenViewer from './SourahListenViewer';
import { FlashList } from '@shopify/flash-list';
import useNetworkStatus from '../hooks/useNetworkStatus';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSourahListenContext } from '../context/SourahListenProvider';
import { router } from 'expo-router';
const QuranListenList = ({sourats}) => {
    const {selectedListenSourah, setSelectedListenSourah} = useSourahListenContext();
  
    const [showAlert, setShowAlert] = useState(false);
    const { t, i18n } = useTranslation();
    const [AlertMessage , setAlertMessage] = useState('unknownError');
    const { isConnected, checkNetworkStatus } = useNetworkStatus(); 


   

    useFocusEffect(
        useCallback(() => {
            if (!isConnected) {
                setAlertMessage('noInternetConnection')
                setShowAlert(true);
            }
        }, [isConnected, i18n.language])
    );

    useFocusEffect(
        useCallback(() => {
            if (!isConnected) {
                
            
                setAlertMessage('noInternetConnection')
            }
        }, []) 
    );

    const handleSourahClick = useCallback(async (item) => {
        try {
            const previousSourah = await AsyncStorage.getItem('selectedListenSourah');
            
            const previousSourahId = previousSourah ? JSON.parse(previousSourah).number : null;
    
            if (previousSourahId !== item.number) {
                await AsyncStorage.removeItem('lastminute');
            }
    
            await AsyncStorage.setItem('selectedListenSourah', JSON.stringify(item));
            
            setSelectedListenSourah(item);
            router.push('/sourah/Listen');
        } catch (e) {
            console.log(e);
        }
    }, []);
    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableOpacity onPress={()=>{handleSourahClick(item)}} className="w-full  border-b-2 border-b-[#BBC4CE35] flex flex-row justify-between items-center  py-5 px-2">

                <SourahListenViewer data={item} />
            </TouchableOpacity>
        );
    }, []);

  

    return (
        <View className="flex-1 w-full">
            
            
                <FlashList
                    className="w-full"
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    data={sourats}
                    estimatedItemSize={200}
                    
                    renderItem={renderItem}
                  
                />
            
        </View>
    );
};


export default QuranListenList;
