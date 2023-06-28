import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { colors } from '../constants';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { auth, db } from '../firebase-config';
import { Divider } from '../components/Divider'
import { PressableItem } from '../components/PressableItem';
import { GetInitials } from '../utils/GetInitials';
import { Asset } from 'expo-asset';

function ProfileScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [tier, setTier] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
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
                    const userTier = userData.tier;
                    const userAvatar = userData.profileImageUrl || null;
                    setName(userName);
                    setTier(userTier);

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

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Auth")
            })
            .catch(error => alert(error.message))
    }

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.root}>
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large" color={colors['accent-green']} />
            ) : (
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors['accent-green']} />
                }>
                    <View
                        style={styles.container}
                    >
                        <Pressable style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.pop()}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                            <Text style={{ fontSize: 16, color: colors.white, fontFamily: 'GothamMedium', marginLeft: 4 }}>Home</Text>
                        </Pressable>

                        <View style={{ flexDirection: 'column', marginVertical: 16 }}>
                            <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Account</Text>
                            <View style={{
                                marginTop: 5,
                                borderBottomColor: colors['accent-green'],
                                borderBottomWidth: 2,
                            }} />
                        </View>

                        <View style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {avatarUri ? (
                                    <Image style={[styles.avatar]} source={{ uri: avatarUri }} />
                                ) : (
                                    <View style={styles.avatar}>
                                        <Text style={styles.initial}>{GetInitials({ name })}</Text>
                                    </View>
                                )}
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: colors.white, fontFamily: 'GothamBold', marginHorizontal: 16 }}>{name}</Text>
                                    <Text style={{ fontSize: 14, color: colors.white, fontFamily: 'GothamBook', marginHorizontal: 16, marginTop: 4 }}>{auth.currentUser?.email}</Text>
                                </View>
                            </View>
                            <View style={{ borderRadius: 20, padding: 10, backgroundColor: colors['accent-green'], justifyContent: 'center' }}>
                                <Text style={{ fontSize: 10, color: colors.blue, fontFamily: 'GothamBook' }}>{tier}</Text>
                            </View>
                        </View>

                        <Divider style={{ marginVertical: 12 }} />

                        <PressableItem
                            onPress={() => navigation.push('ProfileDetails')}
                            icon={<FontAwesome5 name="user-circle" size={20} color={colors['accent-green']} />}
                            title={"Profile details"}
                        />
                        <PressableItem
                            icon={<MaterialCommunityIcons name="star-outline" size={24} color={colors['accent-green']} />}
                            title={"Subscription"}
                        />

                        <Divider style={{ marginVertical: 12 }} />

                        <PressableItem
                            onPress={handleSignOut}
                            icon={<MaterialCommunityIcons name="logout-variant" size={22} color={colors['accent-green']} />}
                            title={'Logout'}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#181A1A',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default ProfileScreen;