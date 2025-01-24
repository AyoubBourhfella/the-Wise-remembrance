import { Text, Image, View } from 'react-native'
import React from 'react'
import images from '../constants/images'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useCallback } from 'react'
import { useSourahListenContext } from '../context/SourahListenProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import { router } from 'expo-router'
const LastListen = () => {
    const [lastListen, setLastListen] = useState(null);
    const { selectedListenSourah, setSelectedListenSourah } = useSourahListenContext();

    const getLastest = async () => {
        try {
            const lastRead = await AsyncStorage.getItem('selectedListenSourah');
            if (lastRead) {
                let data = await JSON.parse(lastRead)
                setLastListen(data);


            }
        } catch (error) {
            console.log(error);
        }
    }
    useFocusEffect(
        useCallback(() => {
            getLastest();
        }
            , [])
    )
    const handlePress = () => {
        if (lastListen) {
            setSelectedListenSourah(lastListen);
            router.push(`/sourah/Listen`)
        }
    }

    const { t } = useTranslation()
    return (
        <TouchableOpacity className=" my-10" onPress={handlePress} >


            <LinearGradient
                colors={['#65D6FC', '#455EB5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="relative rounded-xl w-full bottom-[70px] min-h-[100px] z-20  flex flex-col items-start"
            >
                <View className="p-5 w-full">

                    <View className="flex flex-row items-center gap-3 mb-2  justify-center w-full">
                        <MaterialCommunityIcons name='headphones' size={24} color={'white'} />
                        <Text className="shadow-2xl text-white font-pmedium ">
                            {t('lastListen')}
                        </Text>
                    </View>
                    <View className="flex flex-row items-start   justify-between w-full">
                        <View className="flex flex-col w-1/2 items-start ">
                            <Text className="font-psemibold text-white text-xl">{lastListen ? lastListen.englishName : '-- ---'}</Text>
                        </View>
                        <View className="flex flex-col w-1/2 items-end   ">
                            <Text className="font-psemibold text-white text-xl">{lastListen ? lastListen.name : '-- ---'}</Text>
                        </View>




                    </View>

                </View>
                <Image source={images.backMosque} resizeMode='cover' className="  w-full  absolute bottom-0 opacity-5 " />

            </LinearGradient>
        </TouchableOpacity>
    )
}


export default LastListen