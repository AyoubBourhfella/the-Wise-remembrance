import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import GradientBackground from '../../components/GradientBackground';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { SegmentedControl } from 'react-native-ui-lib/src';
import images from '../../constants/images';
import { LinearGradient } from 'expo-linear-gradient';
import MyAlert from '../../components/MyAlert';
import DrawerTogler from '../../components/DrawerTogler';

const Settings = () => {
  const langs = [{ "label": "English", "value": "en" }, { "label": "العربية", "value": "ar" }, { "label": "French", "value": "fr" }];
  const { t, i18n } = useTranslation();

  const selectdLang = langs.findIndex(lang => lang.value === i18n.language);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');
 

  const updateLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      try {
        const location = await Location.getCurrentPositionAsync({});
        await AsyncStorage.setItem('location', JSON.stringify(location));
        setAlertText(t('locationUpdated')); // Set success message
        setAlertVisible(true);
      } catch (error) {
        console.error('Error updating location', error);
        setAlertText(t('updateError')); // Set error message
        setAlertVisible(true);
      }
    } else {
      console.log('Permission to access location was denied');
      setAlertText(t('permissionDenied')); // Set permission denied message
      setAlertVisible(true);
    }
  };

  

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="my-5">
        <View className="flex-1 h-full flex-col justify-evenly items-center mx-8">
          <View className="w-full mt-5">
            <DrawerTogler />
          </View>
          <View className="w-full mx-5">
            <Image source={images.basmala} resizeMode='contain' className="w-full" />
          </View>
          <View className="flex h-2/5 px-2 flex-col w-full items-center justify-evenly">
            <Text className="text-xl text-white font-pmedium">{t('changeLang')}</Text>
            <SegmentedControl segments={langs}
              activeColor="#65D6FC"
              activeBackgroundColor="transparent"
              className="bg-transparent w-full py-2 font-AlmendraBold text-xl"
              segmentLabelStyle={{ fontFamily: 'Almendra-Bold' }}
              onChangeIndex={(index) => i18n.changeLanguage(langs[index].value)}
              inactiveColor='#cccccc'
              backgroundColor='transparent'
              borderRadius={8}
              containerStyle={{ padding: 10, backgroundColor: 'transparent' }}
              initialIndex={selectdLang}
              outlineColor='#65D6FC'
            />
          </View>
          <View className="flex h-1/5 px-2 flex-col w-full items-center justify-evenly">
            <LinearGradient
              colors={['#65D6FC', '#0DC7D2']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="w-full p-4 rounded-lg"
            >
              <TouchableOpacity onPress={updateLocation}>
                <Text className="text-center text-white text-xl font-pbold">{t('updatelocaton')}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
      <MyAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        text={alertText}
      />
     
    </GradientBackground>
  );
};

export default Settings;
