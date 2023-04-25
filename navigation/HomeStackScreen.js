import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from '../screens/HomeScreen';

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
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
