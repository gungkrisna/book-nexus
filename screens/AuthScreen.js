import React, { useState, useEffect } from 'react';
import { Pressable, Text, ImageBackground, StyleSheet, View, TextInput, } from 'react-native';
import { colors } from '../constants';
import { auth, db } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationCard } from '../components/AuthenticationCard';
import { Divider } from '../components/Divider';
import GoogleIcon from '../components/vectors/GoogleIcon';
import { Feather } from '@expo/vector-icons'

const AuthScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpScreen, setSignUpScreen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        const newUser = userCredentials.user;
        const { uid } = newUser;

        db.collection('users')
          .doc(uid)
          .set({
            name: name,
            email: email,
            tier: "Free"
          })
          .then(() => {
            const user = newUser;
          })
          .catch(error => {
            console.error('Error creating user document:', error);
          });
      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
  }

  const handleLoginByGoogle = () => {
    alert("The @react-native-google-signin/google-signin library can't be used in the Expo Go app because it requires custom native code.")
  }

  return (
    <ImageBackground
      source={require('../assets/bg-image.png')}
      style={styles.background}
    >
      <AuthenticationCard title={!isSignUpScreen ? "Login" : "Sign up"}>
        <View style={{ marginBottom: 16 }}>
          {isSignUpScreen && (
            <>
              <Text style={{ fontFamily: 'GothamBook', fontSize: 14, color: "#fff", lineHeight: 16, maxWidth: '80%' }}>Looks like you don't have an account. Let's create a new account for you.</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                placeholder="Name"
                onChangeText={text => setName(text)}
              />
            </>
          )}
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.textInput}
              value={password}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={({ pressed }) => [{ position: 'absolute', right: 16, top: '47%', opacity: pressed ? 0.5 : 1.0 }]}>
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color={colors['gray-3']} />
            </Pressable>
          </View>
        </View>

        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', marginBottom: 16 }}
        >
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14, color: "#fff", lineHeight: 24 }}>By selecting Create Account below, I agree to </Text>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => setSignUpScreen(true)}>
            <Text style={{ fontFamily: 'GothamBold', fontSize: 14, color: colors['accent-green'] }}>Terms of Service & Privacy Policy</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={!isSignUpScreen ? handleLogin : handleSignUp}
          style={({ pressed }) => [styles.btnStyle, { opacity: pressed ? 0.5 : 1.0 }]}
        >
          <Text style={styles.btnText}>{!isSignUpScreen ? 'Login' : 'Create Account'}</Text>
        </Pressable>



        {!isSignUpScreen && (
          <>
            <Divider title={"Or"} style={{ marginVertical: 32 }} />

            <View style={{ marginBottom: 8 }}>
              <Pressable
                onPress={handleLoginByGoogle}
                style={({ pressed }) => [styles.btnStyle, { backgroundColor: '#fff', position: 'relative', opacity: pressed ? 0.5 : 1.0 }]}
              >
                <View style={{ position: 'absolute', left: 16, top: '50%' }}>
                  <GoogleIcon />
                </View>
                <Text style={styles.btnText}>Login with Google</Text>
              </Pressable>
            </View>
          </>
        )}


        <View
          style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}
        >
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14, color: "#fff" }}>{!isSignUpScreen ? "Don't" : "Already"} have an account? </Text>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => setSignUpScreen(!isSignUpScreen)}>
            <Text style={{ fontFamily: 'GothamBold', fontSize: 14, color: colors['accent-green'] }}>{!isSignUpScreen ? 'Sign up' : 'Log in'}</Text>
          </Pressable>
        </View>

      </AuthenticationCard>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
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

export default AuthScreen;
