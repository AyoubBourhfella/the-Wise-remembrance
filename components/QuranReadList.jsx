import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import MyAlert from './MyAlert';
import { useTranslation } from 'react-i18next';
import SourahViewer from './SourahViewer';
import { getData } from '../constants/db';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSourahContext } from '../context/SourahProvider';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';

const QuranReadList = ({sourats}) => {
    
    

    const { selectedSourah, setSelectedSourah } = useSourahContext();
    
   
    
   
    const handleSourahClick = useCallback(async (item) => {
        try {
            const previousSourah = await AsyncStorage.getItem('selectedSourah');
            
            const previousSourahId = previousSourah ? JSON.parse(previousSourah).id : null;
    
            if (previousSourahId !== item.id) {
                await AsyncStorage.removeItem('currentPage');
            }
    
            await AsyncStorage.setItem('selectedSourah', JSON.stringify(item));
            
            setSelectedSourah(item);
            router.push('/sourah/Sourah');
        } catch (e) {
            console.log(e);
        }
    }, []);
    
   
    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableOpacity onPress={()=>{handleSourahClick(item)}} className="w-full  border-b-2 border-b-[#BBC4CE35] flex flex-row justify-between items-center  py-5 px-2">

                <SourahViewer data={item} />
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

export default QuranReadList;
