import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
const PlayerControl = () => {
    return (
        <View className=" flex-row justify-evenly my-2 mx-5 w-full items-center">
            <TouchableOpacity>
                <Feather name="skip-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="play-circle" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="skip-forward" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default PlayerControl