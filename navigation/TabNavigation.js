import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeAlt, Search, Bookmark } from "react-native-unicons";

// navigation stacks
import HomeStackScreen from './HomeStackScreen';
import ExploreStackScreen from './ExploreStack';
import LibraryStackScreen from './LibraryStackScreen';

// components
import CustomTabBar from '../components/CustomTabBar';

// colors
import { colors } from '../constants';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let icon = <HomeAlt color={focused ? colors['accent-green'] : colors['gray-1']} height={24} width={24}/>;
          if (route.name === 'Explore') {
            icon = <Search color={focused ? colors['accent-green'] : colors['gray-1']} height={24} width={24}/>;
          } else if (route.name === 'Library') {
            icon = <Bookmark color={focused ? colors['accent-green'] : colors['gray-1']} height={24} width={24}/>;
          }

          return icon;
        },
        tabBarActiveTintColor: colors['accent-green'],
        tabBarInactiveTintColor: colors['gray-1']
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Explore'
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryStackScreen}
        options={{
          tabBarLabel: 'Library'
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
