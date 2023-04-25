import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import { Play, Pause, Forward } from "react-native-unicons";
import { colors, bookCovers } from '../constants';

export default function BarAudiobookPlayer({ audiobook }) {
    const toggleScaleValue = useRef(new Animated.Value(1));
    const seekScaleValue = useRef(new Animated.Value(1));

    const [duration, setDuration] = React.useState(100);
    const [currentTime, setCurrentTime] = React.useState(70);


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

    // local state
    const [paused, setPaused] = React.useState(true);
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
                    <Image source={bookCovers[audiobook.image]} style={styles.image} />
                </View>

                <View style={{ flex: 1, gap: 8 }}>
                    <Text style={styles.heading}>Continue Listening</Text>
                    <Text style={[styles.description, { maxWidth: '79%' }]} numberOfLines={2} ellipsizeMode="tail">{audiobook.description}</Text>
                </View>


                <View style={{ gap: 8, flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                        onPress={togglePlayback}
                    >
                        <Animated.View style={{ transform: [{ scale: toggleScaleValue.current }] }}>
                            <View style={styles.circleButton}>
                                <View style={styles.btnCircle}>
                                    {paused ? (
                                        <Play color={colors['bg-shade']} width={20} height={20} />
                                    ) : (
                                        <Pause color={colors['bg-shade']} width={20} height={20} />
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
                    >
                        <Animated.View style={{ transform: [{ scale: seekScaleValue.current }] }}>
                            <View style={styles.circleButton}>
                                <View style={styles.btnCircle}>
                                    <Forward color={colors['bg-shade']} width={20} height={20} />
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>

            </View >
        </TouchableOpacity >
    );
}

BarAudiobookPlayer.defaultProps = {
    audiobook: null
};

BarAudiobookPlayer.propTypes = {
    // optional
    audiobook: PropTypes.shape({
        image: PropTypes.string,
        description: PropTypes.string,
        length: PropTypes.number,
    })
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: colors.black,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 12,
        height: 70,
        width: '100%',
    },
    circleButton: {
        width: 32,
        height: 32,
        borderRadius: 32/2,
        backgroundColor: colors['accent-green'],
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCircle: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50
    },
    containerAudiobook: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        height: 54,
        width: 38,
        marginBottom: 4
    },
    heading: {
        fontFamily: 'GothamMedium',
        fontSize: 14,
        color: colors['accent-green']
    },
    description: {
        fontFamily: 'GothamBook',
        fontSize: 12,
        color: colors.white
    },
    device: {
        fontFamily: 'GothamMedium',
        fontSize: 10,
        color: colors['accent-green'],
        marginLeft: 4,
        textTransform: 'uppercase'
    }
});
