import { Text, Image, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import images from '../constants/images'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import Svg, { Circle } from 'react-native-svg';
import { TouchableOpacity } from 'react-native'
import { useSourahContext } from '../context/SourahProvider'
import { router } from 'expo-router/build'
const LastRead = () => {
    const [lastRead, setLastRead] = useState(null);
    const { selectedSourah, setSelectedSourah } = useSourahContext();

    const getLastest = async () => {
        try {
            const lastRead = await AsyncStorage.getItem('selectedSourah');
            if (lastRead) {
                let data = await JSON.parse(lastRead)
                setLastRead(data);


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
        if (lastRead) {
            setSelectedSourah(lastRead);
            router.push(`/sourah/Sourah`)
        }
    }

    const { t } = useTranslation()
    return (
        <TouchableOpacity onPress={handlePress}>

            <View className="relative w-full  h-fit">
                <Image source={images.QuranBook} resizeMode='cover' className="w-full mx-auto  h-[225px] z-10 " />
                <Image source={images.stars} resizeMode='contain' className="  -right-5 top-7 w-full h-full  absolute " />
            </View>
            <LinearGradient
                colors={['#65D6FC', '#455EB5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="relative rounded-xl w-full bottom-[70px] min-h-[100px] z-20  flex flex-col items-start"
            >
                <View className="p-5 w-full">
                    <Image source={images.basmala} resizeMode='contain' className="w-5/6 mx-auto h-6 p-8  " />



                    <View className="flex flex-row items-center gap-3 mb-2  justify-center w-full">
                        <Ionicons name='book' size={18} color="white" />
                        <Text className="shadow-2xl text-white font-pmedium ">
                            {t('lastRead')}
                        </Text>
                    </View>

                    <View className="flex flex-row items-center gap-3  justify-between w-full">
                        <View className="flex flex-col items-start gap-1">
                            <Text className="font-psemibold text-white text-xl">{lastRead ? lastRead.englishName : '-- ---'}</Text>

                            <View className="flex flex-row items-center gap-1">
                                <Text className="font-pmedium text-xs text-[#ffffff90]">{lastRead ? lastRead.revelationType : '-- --'}</Text>
                                <Svg xmlns="http://www.w3.org/2000/Svg" width="5" height="4" viewBox="0 0 5 4" fill="none">
                                    <Circle cx="2.625" cy="2" r="2" fill="#BBC4CE75" fill-opacity="0.35" />
                                </Svg>
                                <Text className="font-pmedium uppercase text-xs text-[#ffffff84]">{lastRead ? + lastRead.ayahs_len + ' Verses' : '-- --'}</Text>
                            </View>
                        </View>
                        {lastRead ? (
                            <View className="flex flex-col items-start gap-1">

                                <FontAwesome name="bookmark" size={35} color="white" />
                            </View>
                        ) : (
                            <View className="flex flex-col items-start gap-1">

                                <FontAwesome name="bookmark-o" size={35} color="white" />
                            </View>
                        )

                        }



                    </View>


                </View>
                <Image source={images.backMosque} resizeMode='cover' className="  w-full  absolute bottom-0 opacity-5 " />
            </LinearGradient>
        </TouchableOpacity>
    )
}


export default LastRead