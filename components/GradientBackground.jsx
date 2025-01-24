// GradientBackground.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#112095', '#092052']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
      className="relative"
    >
      <Image source={images.circle} resizeMode='contain' className="absolute top-1/4 -left-36  transform opacity-[0.44] " />
      <Image source={images.circle} resizeMode='contain' className="absolute -top-24 -right-10 w-80 h-80  transform opacity-[0.68]  " />
      <SafeAreaView className="flex-1 z-50">
        {children}
      </SafeAreaView>
      <Image source={images.circle} resizeMode='contain' className="absolute -right-72 -bottom-1/4 -translate-y-1/2 opacity-[0.5] " />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
