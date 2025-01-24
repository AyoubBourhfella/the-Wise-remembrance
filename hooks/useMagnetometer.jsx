import { Magnetometer } from 'expo-sensors';
import { useState, useEffect } from 'react';

const useMagnetometer = () => {
  const [magnetometerData, setMagnetometerData] = useState(null);

  useEffect(() => {
    const subscription = Magnetometer.addListener(data => {
      setMagnetometerData(data);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return magnetometerData;
};
