import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SourahListenViewer = ({ data }) => {
    
    return (
        <>
            <View className="flex flex-row w-1/2 flex-grow   items-start ">
                <View className="flex flex-col items-center  my-auto  justify-center">
                    <Svg xmlns="http://www.w3.org/2000/svg" width="21" height="26" viewBox="0 0 21 26" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.5123 13.7269L2.83825 24.1994C2.70665 24.2819 2.55504 24.328 2.39924 24.333C2.24343 24.3379 2.08914 24.3015 1.95245 24.2275C1.81576 24.1536 1.70167 24.0447 1.62209 23.9124C1.54251 23.7801 1.50035 23.6291 1.5 23.4752L1.5 2.52666C1.50003 2.37263 1.54197 2.22143 1.62142 2.08886C1.70088 1.9563 1.81494 1.84723 1.95169 1.77305C2.08843 1.69887 2.24285 1.66231 2.3988 1.66718C2.55476 1.67205 2.70652 1.71817 2.83825 1.80074L19.5141 12.2767C19.6375 12.3545 19.739 12.4617 19.8094 12.5884C19.8798 12.7151 19.9167 12.8573 19.9167 13.0018C19.9167 13.1463 19.8798 13.2885 19.8094 13.4152C19.739 13.5419 19.6375 13.6491 19.5141 13.7269H19.5123Z" stroke="#65D6FC" stroke-width="2" stroke-linecap="round" />
                    </Svg>

                </View>
                <View className="flex  flex-col ml-3 ">
                    <Text className="font-pmedium text-base text-primary">{data.englishName}</Text>
                    <View className="flex flex-row items-center gap-1">
                        <Text className="font-pmedium text-xs text-[#ffffff64]">{data.revelationType}</Text>
                        <Svg xmlns="http://www.w3.org/2000/Svg" width="5" height="4" viewBox="0 0 5 4" fill="none">
                            <Circle cx="2.625" cy="2" r="2" fill="#BBC4CE35" fill-opacity="0.35" />
                        </Svg>
                        <Text className="font-pmedium uppercase text-xs text-[#ffffff64]">{data.ayahs_len}</Text>
                    </View>
                </View>

            </View>
            <View className="flex  flex-col items-start ml-2 ">
                <Text className=" font-AmiriBold text-xl text-primary">{data.name}</Text>

            </View>
        </>
    )
}

export default SourahListenViewer