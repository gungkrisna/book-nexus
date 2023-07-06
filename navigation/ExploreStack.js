import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import ExploreScreen from '../screens/ExploreScreen';
import BooksCollectionScreen from '../screens/BooksCollectionScreen';

const ExploreStack = createNativeStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="ExploreStack"
        component={ExploreScreen}
        options={{
          headerShown: false
        }}
      />
      <ExploreStack.Screen
        name="BooksCollection"
        component={BooksCollectionScreen}
        options={{
          headerShown: false
        }}
      />
    </ExploreStack.Navigator>
  );
}

export default ExploreStackScreen;
