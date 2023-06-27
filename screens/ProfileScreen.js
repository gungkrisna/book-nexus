import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, StyleSheet, Image } from 'react-native';
import { colors } from '../constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase-config';

function ProfileScreen() {
    const navigation = useNavigation();

    const handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
            <ScrollView  >
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        height: 48
                    }}
                >
                    <Pressable style={{marginVertical: 16, flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.pop()}>
                      <Ionicons name="chevron-back" size={24} color="white" />
                      <Text style={{ fontSize: 16, color: colors.white, fontFamily: 'GothamMedium', marginLeft: 4 }}>Home</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'column', marginVertical: 16}}>
                        <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Account</Text>
                        <View style={{
                            marginTop: 5,
                            borderBottomColor: colors['accent-green'],
                            borderBottomWidth: 2,
                        }} />
                    </View>

                    <View style={{marginVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                        <View style={{flexDirection: 'row'}}>
                          <Image style={styles.profileImage} source={require('../assets/images/user.png')} />
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{ fontSize: 16, color: colors.white, fontFamily: 'GothamBold', marginHorizontal: 16 }}>John Doe</Text>
                            <Text style={{ fontSize: 14, color: colors.white, fontFamily: 'GothamBook', marginHorizontal: 16, marginTop: 4 }}>{auth.currentUser?.email}</Text>
                          </View>
                        </View>
                        <View style={{borderRadius: 20, padding: 10, backgroundColor: colors['accent-green'], justifyContent: 'center'}}>
                              <Text style={{ fontSize: 10, color: colors.blue, fontFamily: 'GothamBook' }}>Premium</Text>
                        </View>
                    </View>

                    <View style={{ height: 1, marginVertical: 24, width: '100%', backgroundColor: colors['gray-4'] }} />

                    <Pressable style={({pressed}) => [{
                      flexDirection: 'row',  alignItems: 'center', opacity: pressed ? 0.5 : 1.0
                      }]}
                      onPress={handleSignOut}>
                      <View style={{height: 40, width: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: colors['gray-5']}}>
                          <MaterialCommunityIcons name="logout-variant" size={22} color={colors['accent-green']} />
                      </View>
                      <Text style={{ fontSize: 14, color: colors.white, fontFamily: 'GothamMedium', marginHorizontal: 16, }}>Logout</Text>
                    </Pressable>
                </View>
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
});

export default ProfileScreen;