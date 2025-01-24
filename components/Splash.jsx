import React from 'react';
import { ImageBackground, Image, StyleSheet } from 'react-native';
import images from '../constants/images'; // Adjust the import path as needed

const Splash = () => {
  return (
    <ImageBackground source={images.back1} style={styles.background}>
      <Image source={images.logo}  />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Splash;
