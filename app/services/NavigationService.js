import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconWithBadge from '../components/IconWithBadge';

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
    case 'Setting':
      iconName = 'settings-outline';
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
      size={30}
      color={tintColor}
      badgeCount={10}
    />
  );
};
