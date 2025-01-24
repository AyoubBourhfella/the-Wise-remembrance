import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { useFocusEffect } from 'expo-router';
import { Audio } from 'expo-av';
import ListenerControl from './ListenerControl';
import { getDataUnique } from '../constants/db';
import { useTranslation } from 'react-i18next';
import { useSourahListenContext } from '../context/SourahListenProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';

const cacheAndStreamAudio = async (url) => {
    const fileUri = FileSystem.documentDirectory + url.split('/').pop();
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    // Check if file is already cached
    if (fileInfo.exists) {
        return fileUri;
    } else {
        // Start downloading the file in the background
        const downloadResumable = FileSystem.createDownloadResumable(
            url,
            fileUri
        );
        const { uri } = await downloadResumable.downloadAsync();
        return uri;
    }
};

const Player = ({ data }) => {
    const [progress, setProgress] = useState(0);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const [replay, setReplay] = useState(false); // Add replay state
    const { selectedListenSourah, setSelectedListenSourah } = useSourahListenContext();

    const play = async () => {
        if (sound && !loading) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        }
    };

    const onload = async () => {
        setLoading(true);
        try {
            const API_PARAMS = data.id.toString().padStart(3, '0');
            const url = `https://server8.mp3quran.net/afs/${API_PARAMS}.mp3`;
            const localUri = await cacheAndStreamAudio(url);
            console.log(localUri);
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: localUri },
                { shouldPlay: true }
            );
            newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            setSound(newSound);

            const rep = await AsyncStorage.getItem('replay');
            if (rep) {
                const shouldReplay = rep === 'true';
                if (shouldReplay) {
                    newSound.setIsLoopingAsync(true);
                    setReplay(true);
                }
            }

            const status = await newSound.getStatusAsync();
            if (status.isLoaded) {
                setDuration(status.durationMillis);
                play();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const rewindSeconds = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            const newPosition = Math.max(status.positionMillis - 10000, 0); // Rewind 10 seconds
            await sound.setPositionAsync(newPosition);
            setCurrentTime(newPosition);
        }
    };

    const fastForwardSeconds = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            const newPosition = Math.min(status.positionMillis + 10000, duration); // Fast-forward 10 seconds
            await sound.setPositionAsync(newPosition);
            setCurrentTime(newPosition);
        }
    };

    const onPlaybackStatusUpdate = async (status) => {
        if (status.isLoaded) {
            setCurrentTime(status.positionMillis);
            setProgress(status.positionMillis / status.durationMillis);

            if (status.didJustFinish) {
                const rep = await AsyncStorage.getItem('replay');
                const shouldReplay = rep === 'true';
                if (shouldReplay) {
                    sound.setIsLoopingAsync(true);
                    setReplay(true);
                } else {
                    toNext();
                }
            }
        }
    };

    useEffect(() => {
        if (sound) {
            sound.setIsLoopingAsync(replay);
        }
    }, [replay]);

    const getrep = async () => {
        const rep = await AsyncStorage.getItem('replay');
        setReplay(rep === 'true');
    };

    useFocusEffect(
        useCallback(() => {
            getrep();
        }, [])
    );

    const toNext = async () => {
        if (data.id < 114) {
            const nextSourah = await getDataUnique(i18n.language, data.id + 1);
            setSelectedListenSourah(nextSourah);
            await AsyncStorage.setItem('selectedListenSourah', JSON.stringify(nextSourah));
            router.replace('/sourah/Listen');
        } else {
            ToastAndroid.show(t('noNext'), ToastAndroid.SHORT);
        }
    };

    useFocusEffect(
        useCallback(() => {
            onload();

            return () => {
                if (sound) {
                    sound.unloadAsync();
                }
            };
        }, [])
    );

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View className="w-full flex flex-col justify-center items-center">
            <Progress.Bar
                color="#65D6FC"
                animated={true}
                progress={progress}
                width={300}
                height={3}
                className="rounded-none"
                borderWidth={0}
                borderColor="transparent"
                unfilledColor="#BBC4CE35"
            />
            <View className="flex flex-row justify-between items-center w-[300px] mt-1">
                <Text className="text-[#ffffff64] font-pmedium text-[10px]">
                    {formatTime(currentTime)}
                </Text>
                <Text className="text-[#ffffff64] font-pmedium text-[10px]">
                    {formatTime(duration)}
                </Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#65D6FC" />
            ) : (
                <ListenerControl
                    currentid={data.number}
                    isplaying={isPlaying}
                    onPressPlay={play}
                    replay={replay}
                    setReplay={setReplay}
                    hadnlabackseconds={rewindSeconds} // Pass rewind method
                    hadnlaforwardseconds={fastForwardSeconds}
                />
            )}
        </View>
    );
};

export default Player;
