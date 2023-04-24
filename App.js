import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/GothamBold.otf'),
    'GothamMedium': require('./assets/fonts/GothamMedium.otf'),
    'GothamBook': require('./assets/fonts/GothamBook.otf'),
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;