import { useState, useEffect } from 'react';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000 - currentTime.getSeconds() * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};

export default useCurrentTime;
