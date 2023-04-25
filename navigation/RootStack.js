import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
            <Stack.Navigator screenOptions={{ presentation: 'fullScreenModal', headerShown: false }}>
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
    )
}

export default RootStack;
