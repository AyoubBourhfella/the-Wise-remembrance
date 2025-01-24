import { View, Image, TextInput } from 'react-native'
import React from 'react'
import images from '../constants/images'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
const Search = ({setText}) => {
    const {t} = useTranslation()
    const handlesearch = (text) => {
        setText(text)
    }

    return (
        <View className="w-full  ">
            <View className="relative  w-full flex flex-col items-center  h-fit">
                <Image source={images.QuranBook} resizeMode='contain' className="w-full mx-auto  h-[200px] z-10 " />
                <Image source={images.starsMini} resizeMode='contain' className="w-1/2 h-full absolute" />
            </View>
            <View className="w-full flex flex-row justify-center items-center bg-white/10 border z-50 border-white/20  p-5 rounded-2xl shadow-lg" >
                <TextInput onChange={ (text) => handlesearch(text.nativeEvent.text)} className="w-10/12  font-pbold text-white/80  " placeholderTextColor={'#ffffff29'} placeholder={t('Search')} />
                <View className='w-1/12 m-auto'>
                    <AntDesign name="search1" size={24} color="#65D6FC" />
                </View>
            </View>
        </View>
    )
}

export default Search