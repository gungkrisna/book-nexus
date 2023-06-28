import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabNavigation from './TabNavigation';
import LibraryScreen from '../screens/LibraryScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
            <Stack.Navigator screenOptions={{ presentation: 'fullScreenModal', headerShown: false }}>
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="TabNavigation" component={TabNavigation} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Library" component={LibraryScreen} />
              <Stack.Screen name="Explore" component={ExploreScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
            </Stack.Navigator>
    )
}

export default RootStack;
