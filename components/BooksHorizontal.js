import * as React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors, bookCovers } from '../constants';
import { Feather } from '@expo/vector-icons';

export default function BooksHorizontal({ data, heading }) {
    return (
        <View style={styles.container}>
            {heading &&
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{heading}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                    }}>
                        <Text style={[styles.heading, { color: colors['accent-green'], fontSize: 12 }]}>Show all</Text>
                        <Feather name="arrow-right-circle" size={16} color={colors['accent-green']} />
                    </View>
                </View>
            }

            <FlatList
                contentContainerStyle={styles.containerContent}
                data={data}
                horizontal
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                        style={styles.item}
                    >
                        <View style={styles.image}>
                            {item.image && (
                                <Image source={bookCovers[item.image]} style={styles.image} />
                            )}
                        </View>
                        <View style={{ gap: 4, marginVertical: 4 }}>
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.writer}>{item.writer}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginVertical: 6,
                                    gap: 16,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: "center",
                                        flexDirection: "row",
                                        gap: 4,
                                    }}>
                                    <Feather name="headphones" color={colors['gray-1']} size={16} />
                                    <Text style={styles.info}>5m</Text>
                                </View>
                                <View
                                    style={{
                                        alignItems: "center",
                                        flexDirection: "row",
                                        gap: 4,
                                    }}>
                                <Feather name="book" color={colors['gray-1']} size={16} />
                                <Text style={styles.info}>8m</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

BooksHorizontal.defaultProps = {
    heading: null,
};

BooksHorizontal.propTypes = {
    data: PropTypes.array.isRequired,

    heading: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: '100%'
    },
    containerContent: {
        paddingLeft: 16
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    heading: {
        fontFamily: 'GothamBold',
        fontSize: 20,
        color: colors.white,
    },
    item: {
        marginRight: 8,
        width: 128
    },
    image: {
        backgroundColor: colors.black,
        height: 184,
        width: 128,
        marginBottom: 4
    },
    title: {
        color: colors.white,
        fontFamily: 'GothamMedium',
        fontSize: 12
    },
    writer: {
        color: colors.white,
        fontFamily: 'GothamBook',
        fontSize: 10,
    },
    info: {
        color: colors['gray-1'],
        fontFamily: 'GothamBook',
        fontSize: 10,
    }
});
