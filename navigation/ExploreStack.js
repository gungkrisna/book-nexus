import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import ExploreScreen from '../screens/ExploreScreen';

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
    </ExploreStack.Navigator>
  );
}

export default ExploreStackScreen;
