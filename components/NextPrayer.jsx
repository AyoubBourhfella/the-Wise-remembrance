import { Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useNetworkStatus from '../hooks/useNetworkStatus'; // Adjust the path as needed
import { useTranslation } from 'react-i18next';
const NextPrayer = ({ location, time }) => {
    const { t } = useTranslation();
    const [timings, setTimings] = useState({});
    const [nextPrayer, setNextPrayer] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const { isConnected, checkNetworkStatus } = useNetworkStatus(); // Get network status and function
  
    const formatTimeLeft = (timeleft) => {
      let currentHour = time.getHours();
      let currentMinute = time.getMinutes();
      const [hours, minutes] = timeleft.split(":").map(Number);
  
      let hoursLeft = hours - currentHour;
      let minutesLeft = minutes - currentMinute;
  
      if (minutesLeft < 0) {
        minutesLeft += 60;
        hoursLeft -= 1;
      }
      if (hoursLeft < 0) {
        hoursLeft += 24;
      }
  
      return `${hoursLeft.toString().padStart(2, '0')}h ${minutesLeft.toString().padStart(2, '0')}min`;
    };
  
    const fetchNextPrayer = async () => {
      if (!isConnected) {
        return; // Exit if there's no network connection
      }
      
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${location.city}&country=${location.country}`);
        const data = await response.json();
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
      if (location.city && location.country && isConnected) {
        fetchNextPrayer(); // Fetch prayer times initially when network is connected
      }
    }, [location, isConnected]); // Fetch prayer times when location or network status changes
  
    useFocusEffect(
      useCallback(() => {
        if (isConnected) {
          fetchNextPrayer(); // Fetch prayer times when the screen gains focus
        }
      }, [isConnected]) // Refetch when network status changes
    );
  
    useEffect(() => {
      if (Object.keys(timings).length > 0) {
        const currentHour = time.getHours();
        const currentMinute = time.getMinutes();
  
        const currentPrayer = Object.keys(timings).find(prayer => {
          const [hour, minute] = timings[prayer].split(":").map(Number);
          return hour > currentHour || (hour === currentHour && minute > currentMinute);
        });
  
        if (currentPrayer) {
          setTimeLeft(formatTimeLeft(timings[currentPrayer]));
          setNextPrayer(currentPrayer);
        } else {
          setTimeLeft(formatTimeLeft(timings["Fajr"]));
          setNextPrayer("Fajr");
        }
      }
    }, [timings, time]);
  
    return (
      <View>
        <Text className="text-white text-xl font-pmedium ">
          {t(nextPrayer)}, {timeLeft}
        </Text>
      </View>
    );
  };
  
  export default NextPrayer;