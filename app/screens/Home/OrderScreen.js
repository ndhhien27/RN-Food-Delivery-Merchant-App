/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector, useDispatch } from 'react-redux';
import NewOrderScreen from './NewOrderScreen';
import { theme } from '../../constants/theme';
import { getOrders } from '../../actions/orderActions';
import { fetchingRestaurant } from '../../actions/restaurantActions';

// const FirstRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
// );

export default function OrderScreen(props) {
  const userInfo = useSelector(state => state.userReducer.userInfo);
  // const { restId } = navigation.state.params;
  const dispatch = useDispatch();
  // const [ordersState, setOrdersState] = useState([]);
  useEffect(() => {
    if (userInfo.createdRestaurants) {
      dispatch(getOrders(userInfo.createdRestaurants._id));
      dispatch(fetchingRestaurant(userInfo.createdRestaurants._id));
    }
  }, [userInfo.createdRestaurants]);
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
        <TabBar
          {...props}
          labelStyle={{
            textTransform: 'uppercase',
            fontFamily: theme.text.fonts['sfpt-medium'],
            fontSize: 14,
            // color: theme.color.primary,
          }}
          indicatorStyle={{ backgroundColor: theme.color.primary }}
          indicatorContainerStyle={{ backgroundColor: '#fff' }}
          // contentContainerStyle={{ backgroundColor: '#fff' }}
          inactiveColor={theme.color.darkGray}
          activeColor={theme.color.primary}
        />
      )}
      navigationState={state}
      renderScene={SceneMap({
        first: () => <NewOrderScreen status={['pending']} />,
        second: () => <NewOrderScreen status={['accepted', 'delivering']} />,
        third: () => <NewOrderScreen status={['completed']} />,
        fourst: () => <NewOrderScreen status={['cancelled']} />,
      })}
      onIndexChange={index => setState({ ...state, index })}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
}
