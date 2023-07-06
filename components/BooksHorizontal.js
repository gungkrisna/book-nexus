import React, { useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import BooksFetcher from './BooksFetcher';
import { useNavigation } from '@react-navigation/native';
import { AudiobookContext } from '../context/AudiobookContextProvider';
import { formatTime } from '../utils/FormatTime';

export default function BooksHorizontal({ since, author, title, genre, extended, limit, offset, header }) {
    const params = {
        format: 'json',
        since,
        author,
        title: title ? '^' + title : undefined,
        genre,
        extended: extended ? '1' : undefined,
        limit,
        offset,
        fields: 'id,title,authors,description,url_rss,totaltimesecs'
    };

    const { handleUpdateAudiobookData } = useContext(AudiobookContext);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {header && (
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>{header}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('BooksCollection', { params, header })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.header, { color: colors['accent-green'], fontSize: 12, marginRight: 8 }]}>
                            Show all
                        </Text>
                        <FontAwesome name="chevron-circle-right" size={16} color={colors['accent-green']} />
                    </TouchableOpacity>
                </View>
            )}

            <BooksFetcher params={params}>
                {({ books, loading }) => (
                    <FlatList
                        contentContainerStyle={styles.containerContent}
                        data={books}
                        horizontal
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            <Book item={item} onPress={handleUpdateAudiobookData} />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </BooksFetcher>

        </View>
    );
}

function Book({ item, onPress }) {
    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            style={styles.item}
        >
            <View style={styles.image}>
                <Image source={{ uri: item.bookCover }} style={styles.image} />
            </View>
            <View style={{ marginVertical: 4 }}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.writer}>{`${item.authors[0].first_name} ${item.authors[0].last_name}`}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: 6,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginRight: 16,
                        }}
                    >
                        <Feather name="headphones" color={colors['gray-1']} size={16} />
                        <Text style={styles.info}>{formatTime(item.totaltimesecs) || "-"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: '100%',
    },
    containerContent: {
        paddingLeft: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    header: {
        fontFamily: 'GothamBold',
        fontSize: 20,
        color: colors.white,
    },
    item: {
        marginRight: 8,
        width: 128,
    },
    image: {
        backgroundColor: colors.black,
        height: 184,
        width: 128,
        marginBottom: 4,
    },
    title: {
        color: colors.white,
        fontFamily: 'GothamMedium',
        fontSize: 12,
        marginBottom: 4,
    },
    writer: {
        color: colors.white,
        fontFamily: 'GothamBook',
        fontSize: 10,
    },
    info: {
        marginLeft: 4,
        color: colors['gray-1'],
        fontFamily: 'GothamBook',
        fontSize: 10,
    },
});
