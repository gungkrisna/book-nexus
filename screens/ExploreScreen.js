import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import TagsWrap from '../components/TagsWrap';
import BooksHorizontal from '../components/BooksHorizontal';
import { colors } from '../constants';

import bookTopics from '../mockdata/bookTopics.json';

import fictionBooks from '../mockdata/fictionBooks.json';
import cultureAndSocietyBooks from '../mockdata/cultureAndSocietyBooks.json';
import lifestyleBooks from '../mockdata/lifestyleBooks.json';

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
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Explore</Text>
                        <View style={{
                            marginTop: 5,
                            borderBottomColor: colors['accent-green'],
                            borderBottomWidth: 2,
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
    }
});

export default ExploreScreen;