import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../constants';

export default function LoadingIndicator() {
    return (
        <View style={styles.root}>
            <ActivityIndicator style={styles.activityIndicator} size='small' color={colors['accent-green']} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        backgroundColor: colors['gray-4'],
        height: 48,
        width: 48,
        padding: 8,
        borderRadius: 8
    }
})
