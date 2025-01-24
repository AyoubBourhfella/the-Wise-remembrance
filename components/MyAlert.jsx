import React from 'react';
import { Image, Modal, Text, Touchable, TouchableOpacity, View } from 'react-native';
import images from '../constants/images';
import { LinearGradient } from 'expo-linear-gradient';
const MyAlert = ({ visible, onClose, text }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
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
                        <TouchableOpacity
                            style={{ marginTop: 10 }}
                            onPress={onClose}
                            className=" mt-4"
                        >
                            <Text className="text-primary font-pextrabold text-center">Okey</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

export default MyAlert;
