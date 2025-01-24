import { View, Text, Image } from 'react-native'
import { useState, useEffect } from 'react'
import useCurrentLocation from '../hooks/Location';
import { useGlobalContext } from '../context/GlobalProvider';
import useNetworkStatus from './../hooks/useNetworkStatus';
import images from '../constants/images';
import { useTranslation } from 'react-i18next';
const DayPrayers = () => {
    const {t , i18n} = useTranslation() 
    const { location } = useGlobalContext();
    const { isConnected, checkNetworkStatus } = useNetworkStatus(); 
    const [timings, setTimings] = useState({})

    const currLocation = useCurrentLocation(location);
    const order = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
    const adjustedOrder = i18n.language === 'ar' ? [...order].reverse() : order;
    const fetchNextPrayer = async () => {
        if (!isConnected) {
            return; 
        }

        try {
            const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${currLocation.city}&country=${currLocation.country}`);
            const data = await response.json();
            console.log(response);
            console.log(data);
            setTimings({
                Fajr: data.data.timings.Fajr,
                Dhuhr: data.data.timings.Dhuhr,
                Asr: data.data.timings.Asr,
                Maghrib: data.data.timings.Maghrib,
                Isha: data.data.timings.Isha
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNextPrayer();

    }, [location, isConnected])

    return (
        <View className="flex flex-row justify-between items-center w-full p-4">
            {Object.keys(timings).length > 0 && (
                adjustedOrder.map((prayer) => (
                    <View key={prayer} className="flex flex-col  items-center justify-center gap-2">
                        <Text className="text-white text-base font-AmiriBold">{t(prayer)}</Text>
                        <Image source={images[prayer]} resizeMode='contain' className="h-10 w-10" />
                        <Text className="text-[#ffffff64] text-xs font-pmedium py-2">{timings[prayer]}</Text>
                    </View>
                ))
            )}
        </View>
    )
}

export default DayPrayers