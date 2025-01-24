import {useState ,useEffect} from 'react';
import { View , Keyboard} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

const CustomTabBar = (props) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
  return (
    <View className={`bg-white/10 border  border-white/20 m-5 h-20 rounded-2xl shadow-lg ${keyboardVisible ? 'hidden' : 'flex'}`} style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      
        <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;
