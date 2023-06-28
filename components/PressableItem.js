import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';

export const PressableItem = ({ onPress, icon, title, style }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1.0,
                },
                styles.root,
                style,
            ]}
            onPress={onPress}
        >
            <View style={styles.iconWrapper} >
                {icon}
            </View>
            <Text style={styles.text}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    root: {
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        height: 40,
        width: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['gray-5'],
    },
    text: {
        fontSize: 14,
        color: colors.white,
        fontFamily: 'GothamMedium',
        marginHorizontal: 16,
    }
});
