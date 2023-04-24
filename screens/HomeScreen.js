import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import Chip from '../components/Chip';
import { Fire, BookOpen, Headphones } from "react-native-unicons";
import BooksHorizontal from '../components/BooksHorizontal';

import forYouBooks from '../mockdata/forYouBooks';
import trendingBooks from '../mockdata/trendingBooks';
import fiveMinutesRead from '../mockdata/fiveMinutesRead.json';

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

                <ScrollView
                    contentContainerStyle={styles.chipContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    marginVertical={8}
                >
                    <Chip
                        label="Trending"
                        icon={<Fire width={18} height={18} />}
                        onPress={() => handleChipPress(0)}
                        active={activeIndex === 0}
                    />
                    <Chip
                        label="5-Minutes Read"
                        icon={<BookOpen width={18} height={18} />}
                        onPress={() => handleChipPress(1)}
                        active={activeIndex === 1}
                    />
                    <Chip
                        label="Quick Listen"
                        icon={<Headphones width={18} height={18} />}
                        onPress={() => handleChipPress(2)}
                        active={activeIndex === 2}
                    />
                </ScrollView>

                <View style={styles.adCard}>
                    <View style={{
                        flexDirection: 'col',
                        gap: 16,
                    }}>
                        <Text style={{ fontSize: 20, lineHeight: 30, color: '#EAF4F4', fontFamily: 'GothamBold' }}>Get unlimited access to{"\n"}books in just</Text>
                        <Text style={{ fontSize: 36, color: '#CDE7BE', fontFamily: 'GothamBold' }}>$9.99</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: '#EAF4F4', fontFamily: 'GothamBook' }}>*Terms & conditions apply</Text>
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
    chipContainer: {
        paddingHorizontal: 16,
        paddingRight: 16
    },
    adCard: {
        height: 201,
        flexDirection: 'col',
        alignItems: 'start',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 32,
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