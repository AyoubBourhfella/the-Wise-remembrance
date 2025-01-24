import React, { createContext, useState, useContext } from 'react';

// Create context
const SourahContext = createContext();

// Custom hook to use the context
export const useSourahContext = () => {
  const context = useContext(SourahContext);
  if (!context) {
    throw new Error('useSourahContext must be used within a SourahProvider');
  }
  return context;
};

// Provider component
const SourahProvider = ({ children }) => {
  const [selectedSourah, setSelectedSourah] = useState(null);

  return (
    <SourahContext.Provider value={{ selectedSourah, setSelectedSourah }}>
      {children}
    </SourahContext.Provider>
  );
};

export { SourahProvider };
