import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants';
import { auth, db } from '../firebase-config';

export default function BarAudiobookPlayer({ audiobook }) {
    const toggleScaleValue = useRef(new Animated.Value(1));
    const seekScaleValue = useRef(new Animated.Value(1));
    const bookmarkScaleValue = useRef(new Animated.Value(1));
    const [isBookmark, setBookmark] = useState([]);
    const [paused, setPaused] = useState(false);

    const [duration, setDuration] = useState(100);
    const [currentTime, setCurrentTime] = useState(50);

    useEffect(() => {
        let unsubscribe;

        const fetchData = async () => {
            unsubscribe = await fetchBookmarkStatus();
        };

        fetchData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [audiobook]);

    const fetchBookmarkStatus = async () => {
        if (audiobook) {
            const uid = auth.currentUser.uid;
            const bookmarkRef = db.collection('users').doc(uid).collection('bookmarks').doc(audiobook.id);

            const unsubscribe = bookmarkRef.onSnapshot((snapshot) => {
                const isBookmarked = snapshot.exists;
                setBookmark(() => isBookmarked);
            });

            setPaused(() => false)

            return unsubscribe;
        }
    };

    const togglePlayback = () => {
        setPaused(!paused);
        Animated.sequence([
            Animated.timing(toggleScaleValue.current, {
                toValue: 0.9,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(toggleScaleValue.current, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const seekPlayback = () => {
        if (paused) togglePlayback();
        Animated.sequence([
            Animated.timing(seekScaleValue.current, {
                toValue: 0.9,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(seekScaleValue.current, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const seekPlaybackPressIn = () => {
        if (paused) togglePlayback();
        Animated.timing(seekScaleValue.current, {
            toValue: 0.9,
            duration: 50,
            useNativeDriver: true,
        }).start();
    };

    const seekPlaybackPressOut = () => {
        Animated.timing(seekScaleValue.current, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const createBookmark = async () => {
        if (auth.currentUser && audiobook) {
            const uid = auth.currentUser.uid;
            const bookmarkRef = db.collection('users').doc(uid).collection('bookmarks').doc(audiobook.id);
            try {
                await bookmarkRef.set({
                    audiobookId: audiobook.id,
                });
            } catch (error) {
                console.error('Error creating bookmark collection:', error);
            }
        }
    };

    const deleteBookmark = async () => {
        if (auth.currentUser && audiobook) {
            const uid = auth.currentUser.uid;
            const bookmarkRef = db.collection('users').doc(uid).collection('bookmarks').doc(audiobook.id);

            try {
                await bookmarkRef.delete();
            } catch (error) {
                console.error('Error deleting bookmark collection:', error);
            }
        }
    };

    const handleBookmark = async () => {
        const newBookmarkStatus = !isBookmark;
        setBookmark(newBookmarkStatus);

        if (newBookmarkStatus) {
            await createBookmark();
        } else {
            await deleteBookmark();
        }
    };

    const bookmarkPressIn = () => {
        Animated.timing(bookmarkScaleValue.current, {
            toValue: 0.9,
            duration: 50,
            useNativeDriver: true,
        }).start();
    };

    const bookmarPressOut = () => {
        Animated.timing(bookmarkScaleValue.current, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
        >
            <View style={{ height: 1, width: '100%', backgroundColor: colors.black }}>
                <Animated.View
                    style={{
                        height: '100%',
                        width: `${(currentTime / duration) * 100}%`,
                        backgroundColor: colors['accent-green'],
                    }}
                />
            </View>
            <View style={styles.container}>

                <View style={styles.image}>
                    <Image source={{ uri: audiobook.image }} style={styles.image} />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.heading} numberOfLines={1} ellipsizeMode="tail">{audiobook.title}</Text>
                    <Text style={[styles.description, { maxWidth: '79%' }]} numberOfLines={2} ellipsizeMode="tail">{audiobook.description}</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                        onPress={togglePlayback}
                        style={{ marginRight: 8 }}
                    >
                        <Animated.View style={{ transform: [{ scale: toggleScaleValue.current }] }}>
                            <View style={styles.btnCircle}>
                                <View style={styles.btnIconWrapper}>
                                    {paused ? (
                                        <Feather name="play" color="#fff" size={20} />
                                    ) : (
                                        <Feather name="pause" color={colors['gray-2']} size={20} />
                                    )}
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                        onPress={seekPlayback}
                        onPressIn={seekPlaybackPressIn}
                        onPressOut={seekPlaybackPressOut}
                        style={{ marginRight: 8 }}
                    >
                        <Animated.View style={{ transform: [{ scale: seekScaleValue.current }] }}>
                            <View style={styles.btnCircle}>
                                <View style={styles.btnIconWrapper}>
                                    <Feather name="fast-forward" color="#fff" size={20} />
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                        onPress={handleBookmark}
                        onPressIn={bookmarkPressIn}
                        onPressOut={bookmarPressOut}
                    >
                        <Animated.View style={{ transform: [{ scale: bookmarkScaleValue.current }] }}>
                            <View style={[styles.btnCircle, { backgroundColor: colors['gray-4'] }]}>
                                <View style={styles.btnIconWrapper}>
                                    <FontAwesome name={isBookmark ? "bookmark" : "bookmark-o"} color='#fff' size={20} />
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>

            </View >
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: colors.black,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: 70,
        width: '100%',
    },
    btnCircle: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: colors['gray-4'],
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 54,
        width: 38,
        marginBottom: 4,
        marginRight: 12
    },
    heading: {
        fontFamily: 'GothamMedium',
        fontSize: 14,
        color: colors['accent-green'],
        marginBottom: 8
    },
    description: {
        fontFamily: 'GothamBook',
        fontSize: 12,
        color: colors.white
    },
});
