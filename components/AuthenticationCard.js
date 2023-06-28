import { View, Text, StyleSheet } from 'react-native';

export const AuthenticationCard = ({ title, children }) => {
    return (
        <View style={styles.cardWrapper}>
            <Text style={styles.textHeader}>{title}</Text>
            <View style={styles.container}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        marginHorizontal: 16,
        marginBottom: 72,
    },
    textHeader: {
        marginHorizontal: 16,
        marginVertical: 16,
        fontFamily: 'GothamBold',
        fontSize: 32,
        color: "#fff"
    },
    container: {
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(49, 51, 51, 0.5)',
    },
})