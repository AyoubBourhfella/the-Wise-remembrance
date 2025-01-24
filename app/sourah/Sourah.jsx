import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import GradientBackground from '../../components/GradientBackground'
import { useSourahContext } from '../../context/SourahProvider'
import SourahInfo from '../../components/SourahInfo'
import DetailsBackground from '../../components/DetailsBackground'
import ReadPage from '../../components/ReadPage'
import { getAyahs } from '../../constants/db'
import i18n from './../../constants/i18n';
import { useFocusEffect } from 'expo-router/build'

const Sourah = () => {
  const { selectedSourah, setSelectedSourah } = useSourahContext();
  const [ayahs , setAyahs] = useState([])
  const getSurahFillData = async () => {

    try {
      let ayahs = await getAyahs(i18n.language, selectedSourah.number);
      setAyahs(ayahs)
    } catch (error) {
      console.log(error);
    }
  }
 
  useFocusEffect(
    useCallback(
      () => {
        getSurahFillData()
      }, []
    )
  )
  const ayahText = ayahs.map((ayah) => ayah.text);
  return (
    <DetailsBackground>
      <View className="h-full flex flex-col relative mx-8">
        <SourahInfo data={selectedSourah} />
        <ReadPage ayahs={ayahText} />
      </View>
    </DetailsBackground>
  )
}

export default Sourah
