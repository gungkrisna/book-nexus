import React from 'react';
import { Button, ImageBackground, StyleSheet, View } from 'react-native';

const LoginScreen = ({ navigation }) => {

    return (
        <ImageBackground
            source={require('../assets/bg-image.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Button
                    title="Continue"
                    onPress={() => navigation.navigate('Home')}
                    color="#fff"
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 15,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
    },
});

export default LoginScreen;
