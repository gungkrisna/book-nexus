import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Easing, Text, TextInput, View, Pressable, ScrollView, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db, storage } from '../firebase-config';
import { Divider } from '../components/Divider'
import { PressableItem } from '../components/PressableItem';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { GetInitials } from '../utils/GetInitials';
import { Asset } from 'expo-asset';

function ProfileDetailsScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [avatarUri, setAvatarUri] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isUploadingAvatar, setUploadingAvatar] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (newName !== name) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 75,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 75,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
    }, [name, newName, fadeAnim]);


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
                    setNewName(userName);

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

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            width: 90,
            height: 90
        });

        if (!result.cancelled) {
            try {
                setAvatarUri(result.uri);
                setUploadingAvatar(true);
                const response = await fetch(result.uri);
                const blob = await response.blob();
                const timestamp = Date.now();
                const randomString = uuidv4();
                const filename = `${timestamp}-${randomString}.jpg`;

                const storageRef = storage.ref().child(filename);

                const uploadTask = storageRef.put(blob);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Uploading progress: ${progress}%`)
                    },
                    (error) => {
                        console.error('Error uploading image:', error);
                        fetchUserData();
                    },
                    async () => {
                        const downloadUrl = await storageRef.getDownloadURL();
                        if (auth.currentUser) {
                            const uid = auth.currentUser.uid;
                            const userRef = db.collection('users').doc(uid);

                            await userRef.update({
                                profileImageUrl: downloadUrl,
                            });
                            setUploadingAvatar(false);
                            alert('Profile Image Updated');
                        }
                    }
                );
            } catch (error) {
                console.error('Error picking image:', error);
            }
        }
    };

    const handleUpdateName = async () => {
        if (auth.currentUser) {
            const uid = auth.currentUser.uid;
            const userRef = db.collection('users').doc(uid);

            try {
                await userRef.update({
                    name: newName
                });
                fetchUserData();
            } catch (error) {
                console.error('Error updating name:', error);
            }
        }
    };

    const handleUpdateProfile = async () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        try {
            setIsLoading(true);
            await handleUpdateName();
            alert('Profile Updated');
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.root}>
            {isLoading ? (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator style={{ backgroundColor: colors['gray-4'], height: 48, width: 48, padding: 8, borderRadius: 8 }} size='small' color={colors['accent-green']} />
                </View>
            ) : (
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors['accent-green']} />
                }>
                    <View style={styles.container}>
                        <Pressable style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.pop()}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                            <Text style={{ fontSize: 16, color: colors.white, fontFamily: 'GothamMedium', marginLeft: 4 }}>Back</Text>
                        </Pressable>

                        <View style={{ flexDirection: 'column', marginVertical: 16 }}>
                            <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Profile details</Text>
                        </View>

                        <Pressable onPress={pickImage} style={({ pressed }) => ({ marginVertical: 16, flexDirection: 'col', alignItems: 'center', justifyContent: 'space-between', width: '100%', opacity: pressed ? 0.5 : 1.0 })}>
                            <View style={{ position: 'relative' }}>
                                {avatarUri ? (
                                    <>
                                        <Image style={[styles.avatar]} source={{ uri: avatarUri }} />
                                        {isUploadingAvatar && (
                                            <ActivityIndicator style={[styles.avatar, { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.8)' }]} size='large' color={colors['accent-green']} />
                                        )}
                                    </>
                                ) : (
                                    <View style={styles.avatar}>
                                        <Text style={styles.initial}>{GetInitials({ name })}</Text>
                                    </View>
                                )}
                                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', borderRadius: 32 / 2, bottom: 0, right: 0, height: 32, width: 32, backgroundColor: colors['accent-green'] }}>
                                    <Feather name="upload" size={18} color={colors['gray-4']} />
                                </View>
                            </View>
                            <Text style={{ fontSize: 12, fontFamily: 'GothamMedium', color: colors['accent-green'], marginHorizontal: 16, marginTop: 20 }}>Change profile picture</Text>
                        </Pressable>

                        <Divider style={{ marginVertical: 32 }} />

                        <Text style={styles.inputTitle}>Your Name</Text>

                        <TextInput
                            style={styles.textInput}
                            value={newName}
                            placeholder="Name"
                            onChangeText={text => setNewName(text)}
                        />
                    </View>
                </ScrollView>
            )}
            <Animated.View style={[styles.animatedButtonContainer, { opacity: fadeAnim }]}>
                <Pressable onPress={handleUpdateProfile} style={({ pressed }) => [styles.btnStyle, { opacity: pressed ? 0.5 : 1.0 }]}>
                    <Text style={styles.btnText}>Update Profile</Text>
                </Pressable>
            </Animated.View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-start',
        backgroundColor: '#181A1A',
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
        backgroundColor: '#cecece',
        justifyContent: 'center',
        alignItems: 'center'
    },
    initial: {
        fontSize: 28,
        color: colors['black'],
        fontFamily: 'GothamMedium',
        lineHeight: 0
    },
    inputTitle: {
        fontFamily: 'GothamBook',
        fontSize: 12,
        color: "#fff",
        marginBottom: 8
    },
    textInput: {
        alignItems: 'flex-start',
        borderRadius: 8,
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: colors['gray-5'],
        color: '#fff'
    },
    animatedButtonContainer: {
        position: 'absolute',
        bottom: 36,
        left: 16,
        right: 16,
    },
    btnStyle: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: colors['accent-green']
    },
    btnText: {
        fontFamily: 'GothamBold',
        color: colors['gray-4'],
        fontSize: 14
    },
});

export default ProfileDetailsScreen;