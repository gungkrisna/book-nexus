import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import LibraryScreen from '../screens/LibraryScreen';

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
