import { Dimensions, View, Text } from 'react-native'
import { useState ,useCallback, useEffect} from 'react'
import GradientBackground from '../../../components/GradientBackground'
import DrawerTogler from '../../../components/DrawerTogler'
import Search from '../../../components/Search'
import FadeInView from '../../../components/FadeinView';
import QuranPageViewer from '../../../components/QuranPageViewer'
import { useFocusEffect } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { getData, searchsourat } from '../../../constants/db'
const Quran = () => {
  const [sourats, setSourats] = useState([]);
  const {t , i18n} = useTranslation();
  const screenHeight = Dimensions.get('window').height;
  const navbarHeight = 90;
  const bottomMargin = 20;
  const contentHeight = screenHeight - navbarHeight - bottomMargin;
  const [search , setSearch] = useState('');

  const lang = i18n.language;
  const searchSourats = async (search) => {
    try {
      const searcheddata = await searchsourat(lang, search);
      setSourats(searcheddata);
      console.log(searcheddata);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=> {
    if(search.trim() !== ''){
      searchSourats(search);
    }else{
      fetchSourats();
    }
  },[search])
  const fetchSourats = async () => {
      try {
          const data = await getData(lang);
          if (data) {
              setSourats(data);
          }
      } catch (error) {
          console.log(error);
      }
  };
  useFocusEffect(
    useCallback(() => {

        fetchSourats();
    }, [lang])
);

  return (
    <GradientBackground>
      <View className="h-full flex flex-col relative mx-8" style={{ height: contentHeight }}>
        <DrawerTogler />
        <FadeInView >
          <Search  setText={setSearch}/>
          <View className="w-full   h-3/5 flex">
            <QuranPageViewer sourats={sourats} />
          </View>
        </FadeInView>
      </View>
    </GradientBackground>
  )
}

export default Quran