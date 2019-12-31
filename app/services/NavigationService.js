/* eslint-disable no-underscore-dangle */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import IconWithBadge from '../components/IconWithBadge';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export function goBack(key) {
  _navigator.dispatch(
    NavigationActions.back({
      key,
    }),
  );
}

export function getActiveRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
}

export const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName;
  switch (routeName) {
    case 'Order':
      iconName = 'script-text-outline';
      break;
    case 'Menu':
      iconName = 'book-open-outline';
      break;
    case 'Account':
      iconName = 'account-outline';
      break;
    case 'Notification':
      iconName = 'bell-outline';
      IconComponent = IconWithBadge;
      break;
    default:
      break;
  }
  // You can return any component that you like here!
  return (
    <IconComponent
      name={iconName}
      size={28}
      color={tintColor}
      badgeCount={10}
    />
  );
};
