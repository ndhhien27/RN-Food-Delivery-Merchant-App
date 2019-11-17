import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppSwitch from './AppNavigator';

const AppContainer = createAppContainer(AppSwitch);

export default function App() {
  return <AppContainer />;
}
