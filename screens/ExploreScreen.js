import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import TagsWrap from '../components/TagsWrap';
import BooksHorizontal from '../components/BooksHorizontal';
import { colors } from '../constants';

import bookTopics from '../mockdata/bookTopics';

import fictionBooks from '../mockdata/fictionBooks';
import cultureAndSocietyBooks from '../mockdata/cultureAndSocietyBooks';
import lifestyleBooks from '../mockdata/lifestyleBooks';
import SearchBar from '../components/SearchBar';


function ExploreScreen() {


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
                        <Text style={{ fontSize: 24, color: '#EAF4F4', fontFamily: 'GothamBold' }}>Explore</Text>
                        <View style={{
                            borderBottomColor: colors['accent-green'],
                            borderBottomWidth: 2,
                            borderRadius: '50%',
                        }} />
                    </View>
                </View >

                <SearchBar />

                <TagsWrap tags={bookTopics} heading="Topics" />

                <BooksHorizontal
                    data={fictionBooks}
                    heading="Fiction"
                />

                <BooksHorizontal
                    data={cultureAndSocietyBooks}
                    heading="Culture & Society"
                />

                <BooksHorizontal
                    data={lifestyleBooks}
                    heading="Lifestyle"
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

export default ExploreScreen;