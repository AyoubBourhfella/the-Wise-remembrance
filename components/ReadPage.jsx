import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAGE_HEIGHT = Dimensions.get('window').height * 0.7;
const LongTextPager = ({ sections }) => {
    const [initialPage, setInitialPage] = useState(0);
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const pagerRef = useRef(null);

    const handlePageChange = (event) => {
        const { position } = event.nativeEvent;
        AsyncStorage.setItem('currentPage', position.toString())
            .catch(error => console.log(error));
    };

    const getInitPage = async () => {
        try {
            const value = await AsyncStorage.getItem('currentPage');
            if (value !== null) {
                setInitialPage(parseInt(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInitPage();
    }, []);

    useEffect(() => {
        // Use setTimeout to ensure pagerRef is set
        setTimeout(() => {
            if (pagerRef.current) {
                pagerRef.current.setPage(initialPage);
            }
        }, 100); // Adjust timeout as necessary
    }, [initialPage]);

    return (
        <PagerView
            ref={pagerRef}
            onPageSelected={handlePageChange}
            className="flex-1"
            style={{ height: PAGE_HEIGHT }}
        >
            {sections.map((section, index) => (
                <View key={index} className="flex-1 justify-center">
                    <Text style={{ lineHeight: 50, letterSpacing: 2 }} className={`${isRTL ? 'text-xl' : 'text-base'} font-quran text-white text-center`}>
                        {section}
                    </Text>
                </View>
            ))}
        </PagerView>
    );
};

const ReadPage = ({ ayahs }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const CHAR_PER_PAGE = isRTL ? 650 : 300; 

    const splitTextIntoSections = (textArray) => {
        const textWithIndices = textArray.map((text, index) => `.${text}.(${index + 1})`);
        const sections = [];
        let section = '';
        for (let text of textWithIndices) {
            if ((section.length + text.length) <= CHAR_PER_PAGE) {
                section += text;
            } else {
                sections.push(section);
                section = text;
            }
        }
        if (section.length > 0) {
            sections.push(section);
        }
        return sections;
    };

    const sections = splitTextIntoSections(ayahs);

    return (
        <View className="flex-1 flex flex-grow max-h-[75%] z-40 bg-white/10 rounded-xl border border-white/30 px-4">
            <LongTextPager sections={sections} />
        </View>
    );
};

export default ReadPage;
