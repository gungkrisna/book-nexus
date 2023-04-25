import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { Fire, BookOpen, Headphones } from "react-native-unicons";

import UnderlineArch from '../components/UnderlineArch';
import StoriesHorizontal from '../components/StoriesHorizontal';
import BooksHorizontal from '../components/BooksHorizontal';

import bookStories from '../mockdata/bookStories.json';
import forYouBooks from '../mockdata/forYouBooks';
import trendingBooks from '../mockdata/trendingBooks';
import fiveMinutesRead from '../mockdata/fiveMinutesRead.json';

import { colors } from '../constants';

function HomeScreen() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChipPress = (index) => {
        setActiveIndex(index);
    };

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
            <ScrollView  >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        height: 48
                    }}
                >
                    <View style={{ flexDirection: 'col', gap: 3 }}>
                        <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Good Afternoon</Text>
                        <UnderlineArch />
                    </View>
                    <Image style={styles.profileImage} source={require('../assets/images/user.png')} />
                </View >

                <StoriesHorizontal data={bookStories} />

                <View style={styles.adCard}>
                    <View style={{
                        flexDirection: 'col',
                        gap: 16,
                    }}>
                        <Text style={{ fontSize: 20, lineHeight: 30, color: colors['accent-green'], fontFamily: 'GothamBold' }}>Get unlimited access to{"\n"}books in just</Text>
                        <Text style={{ fontSize: 36, color: '#CDE7BE', fontFamily: 'GothamBold' }}>$9.99</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: colors['accent-green'], fontFamily: 'GothamBook' }}>*Terms & conditions apply</Text>
                    <Image source={require('../assets/images/ad-book.png')} style={styles.image} />
                </View>

                <BooksHorizontal
                    data={forYouBooks}
                    heading="For you"
                />

                <BooksHorizontal
                    data={trendingBooks}
                    heading="Trending"
                />

                <BooksHorizontal
                    data={fiveMinutesRead}
                    heading="5-Minutes read"
                />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#181A1A',
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    storyContainer: {
        paddingHorizontal: 16,
        gap: 12,
        marginVertical: 24
    },
    adCard: {
        height: 201,
        flexDirection: 'col',
        alignItems: 'start',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 32,
        paddingVertical: 14,
        paddingHorizontal: 18,
        backgroundColor: '#2D3047',
        borderRadius: 8,
        position: 'relative',
    },
    image: {
        position: 'absolute',
        bottom: 0,
        right: 6,
    },
});

export default HomeScreen;