import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/GothamBold.otf'),
    'GothamMedium': require('./assets/fonts/GothamMedium.otf'),
    'GothamBook': require('./assets/fonts/GothamBook.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer theme={DarkTheme}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;