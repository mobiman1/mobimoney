import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    Cart: {
      screen: HomeScreen,
    },
    Scan: {
      screen: ScanScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Cart':
            iconName =
              Platform.OS === 'ios'
                ? `ios-cart${focused ? ''
                : '-outline'}`
                : 'md-cart';
            break;
          case 'Scan':
            iconName =
              Platform.OS === 'ios'
                ? `ios-camera${focused ? ''
                : '-outline'}` : 'md-qr-scanner';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios'
                ? `ios-settings${focused ? '' : '-outline'}`
                : 'md-settings';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
