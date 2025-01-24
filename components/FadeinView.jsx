import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const FadeInView = ({ children, duration = 1000, delay = 0, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0); // Reset the animated value to 0
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration, delay]);

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
