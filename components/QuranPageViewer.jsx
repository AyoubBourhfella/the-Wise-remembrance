import { View, Text, TouchableOpacity } from 'react-native';
import  { useState, useRef, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

import PagerView from 'react-native-pager-view';
import QuranReadList from './QuranReadList';
import QuranListenList from './QuranListenList';
import { useTranslation } from 'react-i18next';
import { getData } from '../constants/db';
const QuranPageViewer = ({sourats}) => {
  
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
        
  const pagerRef = useRef(null);

  const handleTabPress = (index) => {
    setActiveTab(index);
    pagerRef.current.setPage(index);
  };

  

  return (
    <View className="flex-1   my-5 w-full">
      
      <View className="flex flex-row w-full">
        <TouchableOpacity
           className={`w-1/2 p-3 ${activeTab === 0 ? 'border-b-primary border-b-4' : 'border-b-[#8789A310]'} border-b-4`}
          onPress={() => handleTabPress(0)}
        >
          <Text className={`${activeTab === 0 ? 'text-primary' : 'text-[#ffffff64]'} font-pmedium text-base text-center`}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-1/2 p-3 ${activeTab === 1 ? 'border-b-primary border-b-4' : 'border-b-[#8789A310]'} border-b-4`}
          onPress={() => handleTabPress(1)}
        >
          <Text  className={`${activeTab === 1 ? 'text-primary' : 'text-[#ffffff64]'} font-pmedium text-base text-center`}>Listen</Text>
        </TouchableOpacity>
      </View>
      <PagerView
        ref={pagerRef}
        className="flex-1"
        initialPage={0}
        onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
      >
        <View key="1" className="flex w-full mb-5 items-center justify-center"> 
          <QuranReadList sourats={sourats} setIsLoading={setIsLoading} isLoading={isLoading}/>
        </View>
        <View className="flex items-center mb-5 justify-center">
          <QuranListenList sourats={sourats} setIsLoading={setIsLoading} isLoading={isLoading}/>

        </View>
      </PagerView>
    </View>
  );
};

export default QuranPageViewer;
