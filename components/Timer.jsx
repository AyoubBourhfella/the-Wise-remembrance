import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NextPrayer from './NextPrayer'
import useCurrentLocation from '../hooks/Location'
import { useGlobalContext } from '../context/GlobalProvider'
import useCurrentTime from './../hooks/Time';



const Format_Hour_min = (time) => {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export default function Timer() {

    const { location } = useGlobalContext();

    const currentTime = useCurrentTime();
    
    const currLocation = useCurrentLocation(location);

    

    return (
        <View className="flex p-5   flex-col items-center justify-center ">
            <Text className="text-6xl pt-4 font-psemibold text-white  ">{Format_Hour_min(currentTime)}</Text>
            <NextPrayer location={currLocation} time={currentTime} />
        </View>
    )
}

