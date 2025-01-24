import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen, Redirect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Splash from '../components/Splash'

const index = () => {
    const [redirectTo, setRedirectTo] = useState('')

    useEffect(() => {
        const checkIfAsked = async () => {
            const value = await AsyncStorage.getItem('hasBeenAsked')
            if (value === null) {
                setRedirectTo('/FirstStep')
            } else {
                setRedirectTo('/Home')
            }
        }
        checkIfAsked()
    }, [])

    if (redirectTo) {
        return <Redirect href={redirectTo} />
    }

    return (
        <Splash/>
    )
}

export default index
