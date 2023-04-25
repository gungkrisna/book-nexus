import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors, bookCovers } from '../constants';
import { Feather } from '@expo/vector-icons';

export default function BooksHorizontal({ data, hasMetadata }) {
    return (
        <View style={styles.container}>

            <View style={styles.gridContainer}>
                {data.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.7}
                        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                        style={styles.item}
                    >
                        <View style={styles.image}>
                            {item.image && (
                                <Image source={bookCovers[item.image]} style={styles.image} />
                            )}
                        </View>
                        <View style={{ gap: 4, marginTop: 16 }}>
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.writer}>{item.writer}</Text>
                            <Text style={styles.description} numberOfLines={2}>A good story about a guy who was very good until the very end when a 16 y.o girl, youngest FBI agent suddenly appear.</Text>

                            {hasMetadata && (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginVertical: 6,
                                        gap: 16,
                                    }}
                                >
                                    <View
                                        style={[styles.info, { backgroundColor: colors['accent-green'] }]}>
                                        <Feather name="headphones" color={colors.black} size={16} />
                                        <Text style={styles.infoText}>5m</Text>
                                    </View>
                                    <View
                                        style={[styles.info, { backgroundColor: colors['gray-1'] }]}>
                                        <Feather name="eye" color={colors.black} size={16} />
                                        <Text style={styles.infoText}>8m</Text>
                                    </View>
                                </View>

                            )}

                            {!hasMetadata && (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginVertical: 6,
                                        gap: 16,
                                    }}
                                >
                                    <View
                                        style={[styles.info, { backgroundColor: colors['accent-green'] }]}>
                                        <Text style={styles.infoText}>69% completed</Text>
                                    </View>
                                </View>
                            )}

                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

BooksHorizontal.propTypes = {
    data: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: '100%'
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    item: {
        marginBottom: 16,
        width: '48%',
    },
    image: {
        backgroundColor: colors.black,
        height: 184,
        width: '100%',
        marginBottom: 4
    },
    title: {
        color: colors.white,
        fontFamily: 'GothamMedium',
        fontSize: 14
    },
    writer: {
        color: colors.white,
        fontFamily: 'GothamBook',
        fontSize: 12,
    },
    description: {
        color: colors.white,
        fontFamily: 'GothamBook',
        fontSize: 10,
        marginTop: 8,
        lineHeight: 14
    },
    info: {
        alignItems: "center",
        flexDirection: "row",
        gap: 4,
        borderRadius: 8,
        paddingHorizontal: 4,
        height: 24
    },
    infoText: {
        color: colors.black,
        fontFamily: 'GothamBook',
        fontSize: 10,
    }
});