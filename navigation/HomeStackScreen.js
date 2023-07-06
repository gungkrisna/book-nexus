import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BooksCollectionScreen from '../screens/BooksCollectionScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name="BooksCollection"
        component={BooksCollectionScreen}
        options={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
