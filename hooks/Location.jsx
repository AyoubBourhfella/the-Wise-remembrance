import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCurrentLocation = (initialLocation) => {
    const [currentLocation, setCurrentLocation] = useState({});

    const transform = async (location) => {
        let geoCode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        if (geoCode.length > 0) {
            let city = geoCode[0].city;
            let country = geoCode[0].country;

            setCurrentLocation({
                city: city,
                country: country,
            });
        } else {
            console.log('City not found in geocode result');
        }
    };

    useEffect(() => {
        const fetchCity = async () => {
            let storedLocation = await AsyncStorage.getItem('location');
            if (storedLocation) {
                try {
                    let parsedLocation = JSON.parse(storedLocation);
                    await transform(parsedLocation);
                } catch (e) {
                    console.log('Error parsing stored location:', e);
                }
            } else {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    let loc = await Location.getCurrentPositionAsync({});
                    await transform(loc);
                    await AsyncStorage.setItem('location', JSON.stringify(loc));
                } else {
                    console.log('Location permission not granted');
                }
            }
        };

        fetchCity();
    }, [initialLocation]);

    return currentLocation;
};

export default useCurrentLocation;
