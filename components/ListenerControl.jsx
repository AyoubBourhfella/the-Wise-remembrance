import { View, ToastAndroid, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { G, Svg, Path, Circle, Defs, Rect, ClipPath, Line } from 'react-native-svg';
import { useSourahListenContext } from '../context/SourahListenProvider';
import { getDataUnique } from '../constants/db';
import { useTranslation } from 'react-i18next';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { Picker, Typography } from 'react-native-ui-lib';
const ListenerControl = ({ isplaying, onPressPlay, currentid, onEnd, replay, setReplay, hadnlabackseconds, hadnlaforwardseconds }) => {

    const [enabledPrev, SetEnabledPrev] = useState(false)
    const [enabledNext, SetEnabledNext] = useState(false)
    const { t, i18n } = useTranslation()
    const { selectedListenSourah, setSelectedListenSourah } = useSourahListenContext()
   
    useEffect(() => {
        if (currentid < 114) {
            SetEnabledNext(true)
        } else {
            SetEnabledNext(false)
        }
        if (currentid > 1) {
            SetEnabledPrev(true)
        } else {
            SetEnabledPrev(false)
        }





    }, [currentid])
    const toPrev = async () => {
        if (currentid > 1) {
            const prevSourah = await getDataUnique(i18n.language, currentid - 1)
            setSelectedListenSourah(prevSourah)
            await AsyncStorage.setItem('selectedListenSourah', JSON.stringify(prevSourah));
            router.replace('/sourah/Listen');
        } else {
            ToastAndroid.show(t('noPrev'), ToastAndroid.SHORT);
        }
    }
    const toNext = async () => {

        if (currentid < 114) {
            const nextSourah = await getDataUnique(i18n.language, currentid + 1)
            console.log(nextSourah);
            setSelectedListenSourah(nextSourah)
            await AsyncStorage.setItem('selectedListenSourah', JSON.stringify(nextSourah));
            router.replace('/sourah/Listen');

        } else {
            ToastAndroid.show(t('noNext'), ToastAndroid.SHORT);


        }
    }
    const handleReplay = async () => {
        setReplay(!replay);
        await AsyncStorage.setItem('replay', JSON.stringify(!replay));
    };

    return (
        <>
            <View className=" flex-row justify-evenly my-2  w-full items-center">
                <TouchableOpacity onPress={toPrev}>



                    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8.35992 16.2108L27.7085 29.403C27.9287 29.5533 28.1858 29.6407 28.452 29.6556C28.7183 29.6706 28.9835 29.6127 29.2192 29.488C29.4549 29.3635 29.6522 29.177 29.7898 28.9487C29.9274 28.7203 30 28.4588 30 28.1922L30 1.80785C30.0001 1.54126 29.9275 1.2797 29.7899 1.05136C29.6523 0.823023 29.455 0.63657 29.2192 0.512104C29.0082 0.400362 28.773 0.341984 28.5342 0.342066C28.2449 0.342066 27.9562 0.428082 27.7085 0.596128L8.35998 13.7883C8.16274 13.9229 8.00134 14.1035 7.8898 14.3146C7.77826 14.5257 7.71995 14.7608 7.71995 14.9995C7.71994 15.2383 7.77824 15.4734 7.88977 15.6845C8.0013 15.8956 8.16269 16.0762 8.35992 16.2108ZM27.0684 4.58162L27.0684 25.419L11.7879 15.0001L27.0684 4.58162ZM1.46578 27.9968C2.27537 27.9968 2.93156 27.3406 2.93156 26.531L2.93156 3.4691C2.93156 2.65951 2.27537 2.00331 1.46578 2.00331C0.655664 2.00331 0 2.65951 0 3.4691L0 26.531C0 27.3406 0.656191 27.9968 1.46578 27.9968Z" fill={enabledPrev ? "#65D6FC" : "#A5A5A5"} />
                    </Svg>

                </TouchableOpacity>
                <TouchableOpacity onPress={onPressPlay}>
                    {
                        isplaying ?

                            <Svg width="80" height="80" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="33" cy="33" r="31" stroke="#65D6FC" stroke-width="4" />
                                <Line x1="25" y1="16" x2="25" y2="50" stroke="#65D6FC" stroke-width="4" stroke-linecap="round" />
                                <Line x1="42" y1="16" x2="42" y2="50" stroke="#65D6FC" stroke-width="4" stroke-linecap="round" />
                            </Svg>

                            :


                            <Svg width="80" height="80" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <G clip-path="url(#clip0_6_1014)">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M48.9887 34.0687L24.468 49.4695C24.2745 49.5908 24.0515 49.6587 23.8224 49.6659C23.5933 49.6732 23.3664 49.6197 23.1654 49.5109C22.9643 49.4021 22.7966 49.2421 22.6795 49.0475C22.5625 48.8529 22.5005 48.6308 22.5 48.4045L22.5 17.5978C22.5001 17.3713 22.5617 17.149 22.6786 16.954C22.7954 16.7591 22.9631 16.5987 23.1642 16.4896C23.3653 16.3805 23.5924 16.3267 23.8218 16.3339C24.0511 16.341 24.2743 16.4089 24.468 16.5303L48.9913 31.9362C49.1728 32.0505 49.3221 32.2081 49.4256 32.3945C49.5291 32.5808 49.5833 32.7899 49.5833 33.0024C49.5833 33.215 49.5291 33.4241 49.4256 33.6104C49.3221 33.7968 49.1728 33.9544 48.9913 34.0687H48.9887Z" stroke="#65D6FC" stroke-width="2" stroke-linecap="round" />
                                </G>
                                <Circle cx="33" cy="33" r="31.5" stroke="#65D6FC" stroke-width="3" />
                                <Defs>
                                    <ClipPath id="clip0_6_1014">
                                        <Rect width="50" height="50" fill="white" transform="translate(10 8)" />
                                    </ClipPath>
                                </Defs>
                            </Svg>


                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={toNext}>

                    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <G clip-path="url(#clip0_6_1015)">
                            <Path d="M21.6401 13.7892L2.29154 0.597017C2.0713 0.446697 1.81421 0.359338 1.54798 0.344356C1.28175 0.329374 1.01648 0.387337 0.780762 0.511997C0.545057 0.63653 0.347793 0.823006 0.210213 1.05134C0.0726342 1.27968 -4.62189e-05 1.54122 1.31245e-07 1.8078V28.1922C-0.00011271 28.4587 0.0725406 28.7203 0.210128 28.9486C0.347714 29.177 0.545016 29.3634 0.780762 29.4879C0.9918 29.5996 1.22699 29.658 1.46578 29.6579C1.75506 29.6579 2.04381 29.5719 2.29148 29.4039L21.64 16.2117C21.8373 16.0771 21.9987 15.8965 22.1102 15.6854C22.2217 15.4743 22.28 15.2392 22.2801 15.0005C22.2801 14.7617 22.2218 14.5266 22.1102 14.3155C21.9987 14.1044 21.8373 13.9238 21.6401 13.7892ZM2.93162 25.4184V4.58104L18.2121 14.9999L2.93162 25.4184ZM28.5342 2.00321C27.7246 2.00321 27.0684 2.6594 27.0684 3.46899V26.5309C27.0684 27.3405 27.7246 27.9967 28.5342 27.9967C29.3443 27.9967 30 27.3405 30 26.5309V3.46899C30 2.6594 29.3438 2.00321 28.5342 2.00321Z" fill={enabledNext ? "#65D6FC" : "#A5A5A5"} />
                        </G>
                        <Defs>
                            <ClipPath id="clip0_6_1015">
                                <Rect width="30" height="30" fill="white" />
                            </ClipPath>
                        </Defs>
                    </Svg>

                </TouchableOpacity>

            </View>
            <View className="w-full flex-row flex justify-evenly mt-4 items-center">
                <TouchableOpacity className="flex flex-col items-center justify-center" onPress={hadnlabackseconds}>
                    <Feather name="fast-forward" style={{ transform: [{ rotate: '180deg' }] }} size={35} color="#ffffff80" />
                    <Text className="text-white/50  w-full ml-auto text-[10px]">
                        - 10 sec
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="mt-5" onPress={handleReplay}>
                    <Entypo name="loop" size={40} color={replay ? "#65D6FC" : "#ffffff64"} />
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-col items-center justify-center" onPress={hadnlaforwardseconds}>
                    <Feather name="fast-forward" size={35} color="#ffffff80" />
                    <Text className="text-white/50  w-full ml-auto text-[10px]">
                        + 10 sec
                    </Text>
                </TouchableOpacity>
            </View>
            
        </>
    )
}

export default ListenerControl