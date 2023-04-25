import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';

export default function Tag({ label }) {

    const handlePress = () => {
    };

    return (
        <TouchableOpacity
            activeOpacity={0.69}
            onPress={handlePress}
            style={[styles.Tag]}>
            <Text style={[styles.label]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Tag: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginEnd: 4,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: colors['gray-4']
    },
    iconContainer: {
        marginRight: 4,
    },
    label: {
        fontFamily: 'GothamBook',
        fontSize: 12,
        color: colors.white
    },
});
