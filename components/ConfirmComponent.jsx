import React from 'react';
import { Image, Modal, Text, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import images from '../constants/images';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
const ConfirmComponent = ({ disabled, loading, text, visible, onClose, onConfirm }) => {
    const { t } = useTranslation()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            {loading ? <View className="absolute top-0 left-0 w-full h-full bg-black/20 justify-center z-50 items-center"><ActivityIndicator color={'#00517Dff'} size={'large'} /></View> : null}
            <View className="flex-1 justify-center items-center bg-black/50 relative" >
                <LinearGradient

                    colors={['#65D6FC', '#455EB5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="rounded-xl"
                >

                    <View style={{ padding: 20, borderRadius: 10, alignItems: 'center' }} className="w-2/3 bg-white/10 ">
                        <Image source={images.QuranBook} className="w-1/2 aspect-video" style={{ height: 100, marginBottom: 20 }} resizeMode="contain" />

                        <Text className="font-pextrabold  text-center ">{text}</Text>
                        <View className=" flex-row justify-evenly  flex-grow items-center mt-4">
                            <TouchableOpacity
                                style={{ marginTop: 10 }}
                                onPress={!disabled && onConfirm}
                                className=" mt-4 mr-7"
                            >
                                <Text className={`${disabled ? 'text-gray-500' : 'text-primary'} font-pextrabold text-center `}>{t('yes')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginTop: 10 }}
                                onPress={onClose}
                                className=" mt-4 ml-7"
                            >
                                <Text className="text-red-600 font-pextrabold text-center">{t('no')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>

        </Modal>
    );
};

export default ConfirmComponent;
