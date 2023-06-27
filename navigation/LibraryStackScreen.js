import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryScreen from '../screens/LibraryScreen'

// screens

const LibraryStack = createNativeStackNavigator();

function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryStack"
        component={LibraryScreen}
        options={{
          headerShown: false
        }}
      />
    </LibraryStack.Navigator>
  );
}

export default LibraryStackScreen;
