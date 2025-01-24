import React, { createContext, useState, useContext } from 'react';

// Create context
const SourahContext = createContext();

// Custom hook to use the context
export const useSourahListenContext = () => {
  const context = useContext(SourahContext);
  if (!context) {
    throw new Error('useSourahContext must be used within a SourahProvider');
  }
  return context;
};

// Provider component
const SourahListenProvider = ({ children }) => {
  const [selectedListenSourah, setSelectedListenSourah] = useState(null);

  return (
    <SourahContext.Provider value={{ selectedListenSourah, setSelectedListenSourah }}>
      {children}
    </SourahContext.Provider>
  );
};

export { SourahListenProvider };
