import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, View, ScrollView, StyleSheet, Pressable, Keyboard } from 'react-native';
import TagsWrap from '../components/TagsWrap';
import BooksHorizontal from '../components/BooksHorizontal';
import { colors } from '../constants';

import bookTopics from '../mockdata/bookTopics.json';

import fictionBooks from '../mockdata/fictionBooks.json';
import cultureAndSocietyBooks from '../mockdata/cultureAndSocietyBooks.json';
import lifestyleBooks from '../mockdata/lifestyleBooks.json';

import { Feather } from "@expo/vector-icons";

function ExploreScreen() {
    const [isFocused, setFocused] = useState('')
    const [searchText, setSearchText] = useState('')

    const handleSearchBarToggle = () => {
        if (isFocused) {
            setSearchText(() => '')
            console.log(searchText);
            setFocused(false);
            Keyboard.dismiss();
        } else {
            setFocused(true);
        }
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
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>Explore</Text>
                        <View style={{
                            marginTop: 5,
                            borderBottomColor: colors['accent-green'],
                            borderBottomWidth: 2,
                        }} />
                    </View>
                </View >

                <View style={[styles.searchBarWrapper, { borderWidth: 1, borderColor: isFocused ? colors['accent-green'] : colors['gray-3'] }]}>
                    <Feather name={isFocused ? "chevron-left" : "search"} onPress={handleSearchBarToggle} size={20} color={colors["gray-1"]} style={{ marginRight: 16 }} />
                    <TextInput
                        style={
                            styles.searchBarInput
                        }
                        value={searchText}
                        placeholder="Title, author, or keyword"
                        placeholderTextColor={colors["gray-2"]}
                        onChangeText={text => setSearchText(text)}
                        onFocus={() => setFocused(() => true)}
                    />
                </View>

                {!isFocused ? (
                    <>
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
                    </>
                ) : (
                    <View style={{marginHorizontal: 16}}>
                        <Text style={{fontFamily: 'GothamBold', fontSize: 16, color: '#fff'}}>Search results</Text>
                    </View>

                )}


            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#181A1A',
    },
    searchBarWrapper: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        marginVertical: 24,
        borderRadius: 8,
        backgroundColor: colors['gray-5'],
    },
    searchBarInput: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 14,
        color: '#fff'
    },
});

export default ExploreScreen;