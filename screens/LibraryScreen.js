import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { colors } from '../constants';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { auth, db } from '../firebase-config';
import BookItem from '../components/BookItem';
import { AudiobookContext } from '../context/AudiobookContextProvider';

import Chip from '../components/Chip';
import BooksFetcher from '../components/BooksFetcher';
import LoadingIndicator from '../components/LoadingIndicator';

function LibraryScreen() {
    const { handleUpdateAudiobookData } = useContext(AudiobookContext);

    const [activeIndex, setActiveIndex] = useState(0);
    const [bookmarkIds, setBookmarkIds] = useState([]);

    const [isLoading, setLoading] = useState(true);

    const handleChipPress = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (activeIndex === 0) {
            const uid = auth.currentUser.uid;
            const bookmarksRef = db.collection('users').doc(uid).collection('bookmarks');
            let unsubscribe;

            const fetchData = async () => {
                try {
                    const snapshot = await bookmarksRef.get();
                    const bookmarkIds = snapshot.docs.map((doc) => doc.data().audiobookId);
                    setBookmarkIds(bookmarkIds);

                    unsubscribe = bookmarksRef.onSnapshot((snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            const changedBookmarkId = change.doc.data().audiobookId;
                            if (change.type === 'added') {
                                setBookmarkIds((prevBookmarkIds) => {
                                    if (!prevBookmarkIds.includes(changedBookmarkId)) {
                                        prevBookmarkIds.unshift(changedBookmarkId); // Add new item to the front
                                        return prevBookmarkIds.slice(); // Return a new array reference to trigger re-render
                                    }
                                    return prevBookmarkIds;
                                });
                            } else if (change.type === 'removed') {
                                setBookmarkIds((prevBookmarkIds) =>
                                    prevBookmarkIds.filter((id) => id !== changedBookmarkId)
                                );
                            }
                        });
                    });
                } catch (error) {
                    console.log('Error fetching bookmarks:', error);
                }
            };

            fetchData();

            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [activeIndex]);



    return (
        <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        height: 48,
                        marginTop: 12
                    }}
                >
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 24, color: colors.white, fontFamily: 'GothamBold' }}>My Library</Text>
                        <View style={{
                            marginTop: 5,
                            borderBottomColor: colors['accent-green'],
                            borderBottomWidth: 2,
                        }} />
                    </View>

                </View >
                <ScrollView
                    contentContainerStyle={styles.chipContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <Chip
                        label="Saved Books"
                        icon={<Feather name="bookmark" size={18} />}
                        onPress={() => handleChipPress(0)}
                        active={activeIndex === 0}
                    />
                    <Chip
                        label="In Progress"
                        icon={<Feather name="headphones" size={18} />}
                        onPress={() => handleChipPress(1)}
                        active={activeIndex === 1}
                    />
                    <Chip
                        label="Completed"
                        icon={<FontAwesome5 name="check-circle" size={18} />}
                        onPress={() => handleChipPress(2)}
                        active={activeIndex === 2}
                    />
                </ScrollView>
            </View>




            {activeIndex === 0 && (
                bookmarkIds.length !== 0 ? (
                    <View style={{ flex: 1 }}>
                        {isLoading && <LoadingIndicator />}
                        <FlatList
                            data={bookmarkIds}
                            keyExtractor={(bookmarkId, index) => index.toString()}
                            numColumns={2}
                            contentContainerStyle={styles.contentContainer}
                            renderItem={({ item: bookmarkId, index }) => (
                                <BooksFetcher key={index} params={{ id: bookmarkId }}>
                                    {({ books, loading }) => { // Corrected the syntax here
                                        if (books.length === 0) {
                                            setLoading(() => true);
                                            return null;
                                        }

                                        setLoading(() => false);

                                        if (!isLoading) {
                                            return (books.map((book, index) => (
                                                <Pressable
                                                    key={index}
                                                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1.0 })}
                                                    onPress={() => handleUpdateAudiobookData(book)}
                                                >
                                                    <BookItem item={book} />
                                                </Pressable>
                                            )));
                                        }
                                    }}
                                </BooksFetcher>
                            )}
                        />
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 24 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'GothamBold' }}>No bookmark is currently added.</Text>
                        <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'GothamBook', marginTop: 8 }}>To add a bookmark, select a book and tap the bookmark icon on the audiobook bar.</Text>
                    </View>
                ))}



            {activeIndex === 1 && <View />}
            {activeIndex === 2 && <View />}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#181A1A',
    },
    chipContainer: {
        paddingHorizontal: 16,
        marginVertical: 24,
    },
    contentContainer: {
        justifyContent: 'center',
        marginHorizontal: 8,
    },
});

export default LibraryScreen;