
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SourahListenInfo = ({ data }) => {
    return (
        <View className="w-full   flex flex-row justify-between items-center  py-5 px-2">
            <View className="flex flex-row w-1/2 flex-grow  items-start ">

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
        </View>
    )
}

export default SourahListenInfo