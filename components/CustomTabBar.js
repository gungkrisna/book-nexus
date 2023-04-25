import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../constants';

// components
import BarAudiobookPlayer from './BarAudiobookPlayer';

// context
import Context from '../context';

// https://reactnavigation.org/docs/5.x/bottom-tab-navigator/#tabbar
function CustomTabBar({ descriptors, navigation, state }) {
  // get main app state
  const { currentAudiobookData, showAudiobookBar } = React.useContext(Context);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <React.Fragment>
      {showAudiobookBar && <BarAudiobookPlayer audiobook={currentAudiobookData} />}

      <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          // default label
          const defaultLabel =
            options.title !== undefined ? options.title : route.name;
          // label set
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : defaultLabel;

          const isFocused = state.index === index;
          const backgroundColor = isFocused ? ["#1E211C", "#181919"] : [colors.black, colors.black];
          const color = isFocused ? colors['accent-green'] : colors['gray-1'];

          const Icon = options.tabBarIcon;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              activeOpacity={0.7}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.containerTab, { backgroundColor }]}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.5 }}
                colors={backgroundColor}
                style={styles.iconTab}
              >
                <Icon focused={isFocused} />
                <Text style={[styles.label, { color }]}>{label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    </React.Fragment>
  );
}

CustomTabBar.propTypes = {
  descriptors: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

CustomTabBar.propTypes = {
  descriptors: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.black,
    borderTopColor: colors['gray-4'],
    borderTopWidth: 1
  },
  containerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    gap: 10
  },
  label: {
    fontFamily: 'GothamBook',
    fontSize: 12
  }
});

export default CustomTabBar;
