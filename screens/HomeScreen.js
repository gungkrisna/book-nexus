import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, View, Image, ScrollView, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import UnderlineArch from '../components/vectors/UnderlineArch';
import StoriesHorizontal from '../components/StoriesHorizontal';
import BooksHorizontal from '../components/BooksHorizontal';

import { Platform } from 'react-native';

import bookStories from '../sample/bookStories.json';

import { colors } from '../constants';

import { auth, db } from '../firebase-config';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { GetInitials } from '../utils/GetInitials';
import { Asset } from 'expo-asset';

function HomeScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [name, setName] = useState('')
    const [avatarUri, setAvatarUri] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && fetchUserData();
    }, [isFocused]);

    const fetchUserData = async () => {
        if (auth.currentUser) {
          const uid = auth.currentUser.uid;
          const userRef = db.collection('users').doc(uid);
      
          try {
            const doc = await userRef.get();
            if (doc.exists) {
              const userData = doc.data();
              const userName = userData.name;
              const userAvatar = userData.profileImageUrl || null;

              setName(userName);
      
              if (userAvatar) {
                const cachedAsset = Asset.fromURI(userAvatar);
      
                if (!cachedAsset.localUri) {
                  await cachedAsset.downloadAsync();
                }
      
                setAvatarUri(cachedAsset.localUri);
              } else {
                setAvatarUri(null);
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
      
          setIsLoading(false);
          setRefreshing(false);
        }
      };
      
    const onRefresh = () => {
        setRefreshing(true);
        fetchUserData();
    };

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
            <StatusBar style='light' />
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large" color={colors['accent-green']} />
            ) : (
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors['accent-green']} />
                }>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Good Afternoon</Text>
                            <View style={{ marginTop: 5 }}>
                                <UnderlineArch />
                            </View>
                        </View>
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1.0 }
                            ]}
                            onPress={() => navigation.push('ProfileScreen')}>
                            {avatarUri ? (
                                <Image style={styles.avatar} source={{ uri: avatarUri }} />
                            ) : (
                                <View style={styles.avatar}>
                                    <Text style={styles.initial}>{GetInitials({ name })}</Text>
                                </View>
                            )}
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
                        header="Featured"
                        limit={4}
                    />

                    <BooksHorizontal
                        header="Trending"
                        limit={4}
                        offset={10}
                    />

                    <BooksHorizontal
                        header="Hidden Gems"
                        limit={4}
                        offset={15}
                    />

                </ScrollView>
            )}
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
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
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