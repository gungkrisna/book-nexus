import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants'

export const Divider = ({ title, style }) => {
    return (
        <View style={[styles.dividerWrapper, style]}>
            <View style={styles.divider} />
            {title && (
                <Text style={styles.dividerTitle}>{title}</Text>
            )}
            {title && (
                <View style={styles.divider} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    dividerWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: colors['gray-4']
    },
    dividerTitle: {
        fontFamily: 'GothamBook',
        fontSize: 14,
        color: colors['gray-2'],
        marginHorizontal: 16
    }
})