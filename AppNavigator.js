import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import OrderScreen from './app/screens/Home/OrderScreen';
import {
  getTabBarIcon,
  getActiveRoute,
} from './app/services/NavigationService';
import { theme } from './app/constants/theme';
import MenuScreen from './app/screens/Menu/MenuScreen';
import AccountScreen from './app/screens/Setting/AccountScreen';
import HeaderBtn from './app/components/HeaderBtn';
import FoodDetail from './app/screens/Menu/FoodDetail';
import LoginScreen from './app/screens/Auth/LoginScreen';
import SelectRestaurantScreen from './app/screens/SelectRestaurantScreen';
import SignupScreen from './app/screens/Auth/SignupScreen';
import SelectPosition from './app/screens/SelectPosition';
import FoodList from './app/screens/Menu/FoodList';
import AuthLoadingScreen from './app/screens/AuthLoadingScreen';
import NewRestScreen from './app/screens/NewRestScreen';
import MapScreen from './app/screens/MapScreen';
import ReviewScreen from './app/screens/ReviewScreen';

const OrderStack = createStackNavigator(
  {
    OrderScreen,
    MapScreen,
  },
  {
    initialRouteName: 'OrderScreen',
    defaultNavigationOptions: () => {
      return {
        title: 'Order',
        headerTintColor: theme.color.primary,
      };
    },
    headerLayoutPreset: 'center',
  },
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    SelectPosition: {
      screen: SelectPosition,
    },
  },
  {
    headerMode: 'none',
  },
);

const MenuStack = createStackNavigator(
  {
    Menu: {
      screen: MenuScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerRight: (
            <HeaderBtn
              title="New"
              onPress={() => navigation.state.params.addDishType()}
            />
          ),
        };
      },
    },
    FoodList: {
      screen: FoodList,
      navigationOptions: ({ navigation }) => {
        return {
          headerRight: (
            <HeaderBtn
              title="New"
              onPress={() => navigation.state.params.addDishType()}
            />
          ),
        };
      },
    },
    FoodDetail: {
      screen: FoodDetail,
      navigationOptions: ({ navigation }) => {
        const { formik } = navigation.state.params;
        return {
          headerRight: (
            <HeaderBtn onPress={() => formik.handleSubmit()} title="Save" />
          ),
        };
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = false;
      if (getActiveRoute(navigation.state).routeName === 'Menu')
        tabBarVisible = true;
      return {
        tabBarVisible,
      };
    },
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => {
      return {
        headerTintColor: theme.color.primary,
      };
    },
  },
);

const AccountStack = createStackNavigator(
  {
    Account: {
      screen: AccountScreen,
      navigationOptions: () => {
        return {
          title: 'Account',
        };
      },
    },
    Review: {
      screen: ReviewScreen,
      navigationOptions: () => {
        return {
          title: 'Reviews',
        };
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => {
      return {
        headerTintColor: theme.color.primary,
      };
    },
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Order: OrderStack,
    Menu: MenuStack,
    Account: AccountStack,
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
        // marginTop: -5,
      },
      // tabStyle: {
      //   marginBottom: -5,
      // },
    },
    initialRouteName: 'Order',
  },
);

const AppNavigator = createStackNavigator(
  {
    NewRest: NewRestScreen,
    Tab: TabNavigator,
  },
  {
    headerMode: 'none',
  },
);

const AppSwitch = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Main: AppNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default AppSwitch;
