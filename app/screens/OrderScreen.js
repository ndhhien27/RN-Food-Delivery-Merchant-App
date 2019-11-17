/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NewOrderScreen from './Home/NewOrderScreen';

// const FirstRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
// );

export default function OrderScreen() {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: 'first', title: 'New Order' },
      { key: 'second', title: 'Accepted' },
      { key: 'third', title: 'Completed' },
      { key: 'fourst', title: 'Cancelled' },
    ],
  });

  return (
    <TabView
      renderTabBar={props => (
        <TabBar {...props} labelStyle={{ textTransform: 'capitalize' }} />
      )}
      navigationState={state}
      renderScene={SceneMap({
        first: () => <NewOrderScreen />,
        second: () => <NewOrderScreen />,
        third: () => <NewOrderScreen />,
        fourst: () => <NewOrderScreen />,
      })}
      onIndexChange={index => setState({ ...state, index })}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
