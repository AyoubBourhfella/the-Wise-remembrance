import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import { useTranslation } from 'react-i18next';
import images from '../../constants/images';
import MyAlert from '../../components/MyAlert';
import DrawerTogler from '../../components/DrawerTogler';
import FadeInView from '../../components/FadeinView';
import { Ionicons } from '@expo/vector-icons';
import { useEffect , useState } from 'react';
const About = () => {
  const { t , i18n} = useTranslation();
  const [isRTL , setIsRTL] = useState()
  
  useEffect(() => {
    setIsRTL(i18n.language === 'ar');
  }, [i18n.language])
  return (
    <GradientBackground>
      <View className="flex-1 flex-col mx-8">
        <View className="flex flex-row items-center  ">
          <DrawerTogler />
            <Text className="text-white font-AmiriBold text-center mx-auto text-lg mt-5">{t('title')}</Text>
        </View>

        <View className="flex-1 w-full flex-col items-center">
          
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <FadeInView duration={1000} delay={0}>
              <View className="mb-6">
                <Text className="text-white font-pregular text-center text-lg">{t('about_text')}</Text>
              </View>
            </FadeInView>
          </ScrollView>
          <View className={`my-4 flex flex-row justify-start items-center  w-full px-4 h-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Text className="text-white font-pmedium">{t('contactme')}</Text>
            <View className="ml-2 flex flex-row justify-evenly flex-grow items-center">
              <TouchableOpacity className="bg-white/20 p-2 rounded-full" onPress={() => Linking.openURL('mailto:ayoub.bourhfella1@gmail.com')}>
                <Ionicons name="mail-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full" onPress={() => Linking.openURL('https://github.com/Ayoub-b1')}>
                <Ionicons name="logo-github" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full" onPress={() => Linking.openURL('https://www.linkedin.com/in/ayoub-bourhfella')}>
                <Ionicons name="logo-linkedin" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

export default About;
