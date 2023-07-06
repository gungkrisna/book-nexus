import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootStack from './navigation/RootStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { auth } from 'firebase';
import AudiobookContextProvider from './context/AudiobookContextProvider';

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/GothamBold.otf'),
    'GothamMedium': require('./assets/fonts/GothamMedium.otf'),
    'GothamBook': require('./assets/fonts/GothamBook.otf'),
  });

  const [authLoaded, setAuthLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setIsAuthenticated(user ? true : false);
      setAuthLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && authLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authLoaded]);

  if (!fontsLoaded || !authLoaded) {
    return null;
  }

  return (
    <AudiobookContextProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer theme={DarkTheme}>
          <RootStack isAuthenticated={isAuthenticated} />
        </NavigationContainer>
      </SafeAreaProvider>
    </AudiobookContextProvider>
  );
}

export default App;
