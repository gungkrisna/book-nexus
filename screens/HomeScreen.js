import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import Chip from '../components/Chip';
import { Fire, BookOpen, Headphones } from "react-native-unicons";

export default HomeScreen = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChipPress = (index) => {
        setActiveIndex(index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        marginVertical: 24,
                    }}
                >
                    <Text style={{ fontSize: 24, color: '#EAF4F4', fontFamily: 'GothamBold' }}>Good Afternoon</Text>
                    <View
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 100 / 2,
                            backgroundColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 24, color: '#EAF4F4', fontFamily: 'GothamBook' }}>gk</Text>

                    </View>
                </View >

                <ScrollView horizontal={true} style={styles.chipContainer}>
                    <Chip
                        label="Trending"
                        icon={<Fire width={18} height={18} />}
                        activeColor="#CDE7BE"
                        onPress={() => handleChipPress(0)}
                        active={activeIndex === 0}
                    />
                    <Chip
                        label="5-Minutes Read"
                        icon={<BookOpen width={18} height={18} />}
                        activeColor="#CDE7BE"
                        onPress={() => handleChipPress(1)}
                        active={activeIndex === 1}
                    />
                    <Chip
                        label="Quick Listen"
                        icon={<Headphones width={18} height={18} />}
                        activeColor="#CDE7BE"
                        onPress={() => handleChipPress(2)}
                        active={activeIndex === 2}
                    />
                </ScrollView>

                <View style={styles.adCard}>
                    <Text style={{ fontSize: 20, lineHeight: 30, color: '#EAF4F4', fontFamily: 'GothamBold' }}>Get unlimited access to{"\n"}books in just</Text>
                    <Text style={{ fontSize: 36, color: '#CDE7BE', fontFamily: 'GothamBold' }}>$9.99</Text>
                    <Text style={{ fontSize: 10, color: '#EAF4F4', fontFamily: 'GothamBook' }}>*Terms & conditions apply</Text>
                    <Image source={require('../assets/ad-book.png')} style={styles.image} />
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
    chipContainer: {
        paddingHorizontal: 16,
        marginVertical: 8,
    },
    adCard: {
        height: 201,
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 24,
        paddingVertical: 14,
        paddingHorizontal: 18,
        backgroundColor: '#2D3047',
        borderRadius: 8,
        position: 'relative',
    },
    image: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});