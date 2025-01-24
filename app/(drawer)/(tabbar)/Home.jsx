import React, { useEffect } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import GradientBackground from '../../../components/GradientBackground'; // Adjust the path as needed
import Timer from '../../../components/Timer'; // Adjust the path as needed
import LastRead from '../../../components/LastRead'; // Adjust the path as needed
import LastListen from '../../../components/LastListen'; // Adjust the path as needed
import DrawerTogler from '../../../components/DrawerTogler'; // Adjust the path as needed
import FadeInView from '../../../components/FadeinView'; // Adjust the path as needed
import { useTranslation } from 'react-i18next';




const Home = () => {
  const screenHeight = Dimensions.get('window').height;
  const navbarHeight = 90;
  const bottomMargin = 20;
  const contentHeight = screenHeight - navbarHeight - bottomMargin;
  const { t, i18n } = useTranslation();

  
  
  return (
    <GradientBackground>
      <View className="h-full flex flex-col relative mx-8" style={{ height: contentHeight }}>
        <DrawerTogler />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FadeInView duration={1000} delay={0}>
            <Timer />
          </FadeInView>
          <FadeInView duration={1000} delay={500}>
            <LastRead />
          </FadeInView>
          <FadeInView duration={1000} delay={500}>
            <LastListen />
          </FadeInView>
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default Home;
