// useNetworkStatus.js
import { useState, useEffect } from 'react';
import * as Network from 'expo-network';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const checkNetworkStatus = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected);
      setIsLoading(false);
      if (!networkState.isConnected) {
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setShowAlert(true);
    }
  };
  useEffect(() => {

    checkNetworkStatus();
  }, []);

  return { isConnected, isLoading, showAlert, setShowAlert , checkNetworkStatus };
};

export default useNetworkStatus;
