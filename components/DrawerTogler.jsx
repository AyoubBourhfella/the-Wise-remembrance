import { View, Text, Touchable  , TouchableOpacity} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import drawer from 'expo-router/drawer'
import { useNavigation , DrawerActions } from '@react-navigation/native'

const DrawerTogler = () => {
    const navigation = useNavigation();
    const handletoggle = () => { 
        navigation.dispatch(DrawerActions.toggleDrawer())
    }

    return (

        <TouchableOpacity onPress={handletoggle} className="mt-5 p-1  flex flex-col ">
            <View className="bg-primary my-0.5 w-5 h-1 rounded-r-full">
            </View>
            <View className="bg-primary my-0.5 w-8 h-1 rounded-r-full">
            </View>
            <View className="bg-primary my-0.5 w-6 h-1 rounded-r-full">
            </View>
        </TouchableOpacity>
    )
}

export default DrawerTogler