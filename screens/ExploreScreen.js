import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, View, ScrollView, StyleSheet, Pressable, Image, Keyboard, ActivityIndicator } from 'react-native';
import Tags from '../components/Tags';
import BooksHorizontal from '../components/BooksHorizontal';
import { colors } from '../constants';

import bookTopics from '../sample/bookTopics.json';

import { Feather } from "@expo/vector-icons";
import BooksFetcher from '../components/BooksFetcher';
import { AudiobookContext } from '../context/AudiobookContextProvider';

function ExploreScreen() {
    const { handleUpdateAudiobookData } = useContext(AudiobookContext);
    const [isFocused, setFocused] = useState('')
    const [searchText, setSearchText] = useState('')

    const handleSearchBarToggle = () => {
        if (isFocused) {
            setSearchText(() => '')
            setFocused(false);
            Keyboard.dismiss();
        } else {
            setFocused(true);
        }
    };

    const handleTopicPress = (topic) => {
        setSearchText(() => topic)
        setFocused(true);
    }

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

                <View style={isFocused && ({ opacity: 0, height: 0, pointerEvents: 'none' })}>
                    <Tags tags={bookTopics} heading={"Trending"} onPress={handleTopicPress} />

                    <BooksHorizontal
                        header="Science"
                        genre="science"
                        limit={6}
                    />
                    <BooksHorizontal
                        header="Comedy"
                        genre="comedy"
                        limit={6}
                    />
                    <BooksHorizontal
                        header="Satire"
                        genre="satire"
                        limit={6}
                    />
                    <BooksHorizontal
                        header="Romance"
                        genre="romance"
                        limit={6}
                    />
                    <BooksHorizontal
                        header="Arts"
                        genre="arts"
                        limit={6}
                    />
                </View>
                {isFocused && (
                    <View style={{ marginHorizontal: 16 }}>
                        <Text style={{ fontFamily: 'GothamBold', fontSize: 16, color: '#fff' }}>{searchText ? "Search results" : "Recent search"}</Text>
                        <View style={{ marginVertical: 8 }}>
                            {searchText && (
                                <BooksFetcher params={{ title: '^' + searchText }}>
                                    {({ books, loading, error }) => loading ? (<ActivityIndicator size='small' color={colors['accent-green']} />) : (
                                        books.map((book, index) => (
                                            <Pressable key={index.toString()}
                                                onPress={() => handleUpdateAudiobookData(book)}
                                                style={{ marginVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image style={styles.avatar} source={{ uri: book.bookCover }} />
                                                    <View style={{ justifyContent: 'center' }}>
                                                        <Text style={{ fontSize: 16, color: colors.white, fontFamily: 'GothamBold', marginHorizontal: 16 }}>{book.title}</Text>
                                                        <Text style={{ fontSize: 14, color: colors.white, fontFamily: 'GothamBook', marginHorizontal: 16, marginTop: 4 }}>{`${book.authors[0].first_name} ${book.authors[0].last_name}`}</Text>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        ))
                                    )}
                                </BooksFetcher>
                            )}
                        </View>
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
        color: '#fff',
        outlineStyle: 'none',
    },
    avatar: {
        width: 48,
        height: 72,
        borderRadius: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default ExploreScreen;