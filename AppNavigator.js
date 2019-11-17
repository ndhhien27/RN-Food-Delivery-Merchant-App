import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import OrderScreen from './app/screens/OrderScreen';
import { getTabBarIcon } from './app/services/NavigationService';
import { theme } from './app/constants/theme';
import MenuScreen from './app/screens/Menu/MenuScreen';
import SettingScreen from './app/screens/Setting/SettingScreen';
import HeaderBtn from './app/components/HeaderBtn';
import FoodList from './app/screens/Menu/FoodList';

const OrderStack = createStackNavigator({
  Order: OrderScreen,
});

const MenuStack = createStackNavigator({
  Menu: {
    screen: MenuScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerRight: (
          <HeaderBtn onPress={navigation.state.params.addDishType} />
        ),
      };
    },
  },
  Foods: {
    screen: FoodList,
    navigationOptions: () => {
      return {
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerRight: <HeaderBtn />,
      };
    },
  },
});

const SettingStack = createStackNavigator({
  Setting: SettingScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Order: OrderStack,
    Menu: MenuStack,
    Setting: SettingStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: theme.color.primary,
      inactiveTintColor: theme.color.darkGray,
      labelStyle: {
        fontFamily: theme.text.fonts.sfpt,
        fontSize: 14,
        marginTop: -5,
      },
      tabStyle: {
        marginBottom: -5,
      },
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
  },
  {
    headerMode: 'none',
  },
);

const AppSwitch = createSwitchNavigator({
  Main: AppNavigator,
});

export default AppSwitch;
