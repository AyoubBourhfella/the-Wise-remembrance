import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [location, setLocation] = useState(null);

    const updateLocation = async (newLocation) => {
        setLocation(newLocation);
        await AsyncStorage.setItem('location', JSON.stringify(newLocation));
    };

    return (
        <GlobalContext.Provider value={{ location, updateLocation }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
