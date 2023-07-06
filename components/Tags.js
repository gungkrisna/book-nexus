import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { colors } from '../constants';

export default function Tags({ tags, heading, onPress }) {
    return (
        <View style={styles.root}>
            {heading &&
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{heading}</Text>
                </View>
            }
            <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                    <View key={index} style={{ marginRight: 8, marginBottom: 13 }} >
                        <Pressable
                            style={({ pressed }) => [styles.tag, { opacity: pressed ? 0.7 : 1.0 }]}
                            onPress={() => onPress(tag.data)}>
                            <Text style={styles.tagLabel}>{tag.label}</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        marginBottom: 27,
        width: '100%'
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
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 16,
    },
    tag: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginEnd: 4,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: colors['gray-4']
    },
    tagLabel: {
        fontFamily: 'GothamBook',
        fontSize: 12,
        color: colors.white
    },
});
