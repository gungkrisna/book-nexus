import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import UnderlineArch from '../components/UnderlineArch';
import StoriesHorizontal from '../components/StoriesHorizontal';
import BooksHorizontal from '../components/BooksHorizontal';

import { Platform } from 'react-native';

import bookStories from '../mockdata/bookStories.json';
import forYouBooks from '../mockdata/forYouBooks.json';
import trendingBooks from '../mockdata/trendingBooks.json';
import fiveMinutesRead from '../mockdata/fiveMinutesRead.json';

import { colors } from '../constants';

import { auth } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
            <StatusBar style='light' />
            <ScrollView  >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Good Afternoon</Text>
                        <View style={{ marginTop: 5 }}>
                            <UnderlineArch />
                        </View>
                    </View>
                    <Pressable
                    style={({pressed}) => [
                      { opacity: pressed ? 0.5 : 1.0 }
                    ]} 
                    onPress={() => navigation.push('ProfileScreen')}>
                      <Image style={styles.profileImage} source={require('../assets/images/user.png')} />
                    </Pressable>
                </View >

                <StoriesHorizontal data={bookStories} />

                <View style={styles.adCard}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Text style={{ fontSize: 20, lineHeight: 30, color: colors['accent-green'], fontFamily: 'GothamBold' }}>Get unlimited access to{"\n"}books in just</Text>
                        <Text style={{ fontSize: 36, color: colors['accent-green'], fontFamily: 'GothamBold', marginTop: 16 }}>$9.99</Text>
                    </View>
                    <Text style={{ fontSize: Platform.OS === 'ios' ? 10 : Platform.OS === 'web' ? 8 : 0, color: colors['accent-green'], fontFamily: 'GothamBook' }}>*Terms & conditions apply</Text>
                    <Image source={require('../assets/images/ad-book.png')} style={Platform.OS === 'web' ? { ...styles.webAdImage } : { ...styles.image }} />
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
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        height: 48,
        marginTop: 12
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    adCard: {
        height: 201,
        flexDirection: 'column',
        alignItems: 'flex-start',
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
    webAdImage: {
        transform: [{ scale: 0.85 }],
        position: 'absolute',
        bottom: -12,
        right: -12
    },
});

export default HomeScreen;