import React, { useState, useEffect } from 'react';
import { Pressable, Text, ImageBackground, StyleSheet, View, TextInput, } from 'react-native';
import { colors } from '../constants';
import { auth } from '../firebase-config';
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("TabNavigation")
      }
    })

    return unsubscribe
  }, [navigation])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }
    return (
        <ImageBackground
            source={require('../assets/bg-image.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={email}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.textInput}
                    value={password}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                />
                <Pressable
                    onPress={handleLogin}
                    style={styles.btnStyle}
                >
                  <Text style={styles.btnText}>Login</Text>
                </Pressable>
                <Pressable
                    onPress={handleSignUp}
                    style={styles.btnStyle}
                >
                  <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>
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
    textInput: {
      marginTop: 16,
      alignItems: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 8,
      backgroundColor: '#fff'
    },
    btnStyle: {
      marginTop: 16,
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 8,
      backgroundColor: colors['accent-green']
    },
    btnText: {
      fontFamily: 'GothamBold',
      color: colors['gray-4'],
      fontSize: 14
    }
});

export default LoginScreen;
