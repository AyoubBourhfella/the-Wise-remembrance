import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { useSourahContext } from '../context/SourahProvider'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
const SourahViewer = ({ data }) => {
    const { selectedSourah, setSelectedSourah } = useSourahContext();
  
   
    return (
        <>
            <View className="flex flex-row w-1/2 flex-grow  items-start ">
                <View className="flex items-center  justify-center">
                    <Svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                        <Path d="M31.7031 12.6219V5.97656C31.7031 5.39409 31.2309 4.92188 30.6484 4.92188L24.0031 4.92188L19.3692 0.307336C18.9576 -0.102445 18.2923 -0.102445 17.8807 0.307336L13.2469 4.92188L6.60156 4.92188C6.01909 4.92188 5.54688 5.39409 5.54688 5.97656L5.54687 12.6219L0.932336 17.2558C0.522555 17.6674 0.522555 18.3327 0.932336 18.7443L5.54687 23.3781L5.54687 30.0234C5.54687 30.6059 6.01909 31.0781 6.60156 31.0781H13.2469L17.8807 35.6927C18.0865 35.8976 18.3558 36 18.625 36C18.8942 36 19.1635 35.8976 19.3692 35.6927L24.0031 31.0781H30.6484C31.2309 31.0781 31.7031 30.6059 31.7031 30.0234V23.3781L36.3177 18.7443C36.7274 18.3327 36.7274 17.6674 36.3177 17.2558L31.7031 12.6219ZM29.9011 22.1983C29.7043 22.396 29.5938 22.6635 29.5938 22.9425V28.9688H23.5675C23.2886 28.9688 23.021 29.0793 22.8234 29.2761L18.625 33.4569L14.4267 29.2761C14.229 29.0793 13.9615 28.9688 13.6825 28.9688H7.65625L7.65625 22.9425C7.65625 22.6636 7.54572 22.396 7.34891 22.1984L3.16813 18L7.34891 13.8017C7.54572 13.604 7.65625 13.3365 7.65625 13.0575L7.65625 7.03125L13.6825 7.03125C13.9614 7.03125 14.229 6.92072 14.4266 6.72391L18.625 2.54313L22.8234 6.72391C23.0211 6.92072 23.2886 7.03125 23.5675 7.03125L29.5938 7.03125V13.0575C29.5938 13.3364 29.7043 13.604 29.9011 13.8016L34.0819 18L29.9011 22.1983Z" fill="#00B1EC" />
                    </Svg>
                    <Text className="  absolute text-sm text-primary font-pmedium">{data.number}</Text>

                </View>
                <View className="flex  flex-col ml-2 ">
                    <Text className="font-pmedium text-base text-primary">{data.englishName}</Text>
                    <View className="flex flex-row items-center gap-1">
                        <Text className="font-pmedium text-xs text-[#ffffff64]">{data.revelationType}</Text>
                        <Svg xmlns="http://www.w3.org/2000/Svg" width="5" height="4" viewBox="0 0 5 4" fill="none">
                            <Circle cx="2.625" cy="2" r="2" fill="#BBC4CE35" fill-opacity="0.35" />
                        </Svg>
                        <Text className="font-pmedium uppercase text-xs text-[#ffffff64]">{data.ayahs_len} VERSES</Text>
                    </View>
                </View>

            </View>
                <View className="flex  flex-col items-start ml-2 ">
                    <Text className=" font-AmiriBold text-xl text-primary">{data.name}</Text>
                    
                </View>
        </>
    )
}

export default SourahViewer