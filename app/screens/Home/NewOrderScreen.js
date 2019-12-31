/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useMemo } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { Overlay } from 'react-native-elements';
import NewOrderItem from '../../components/NewOrderItem';
import OrderDetail from './OrderDetail';
import { getOrders } from '../../actions/orderActions';
import { theme } from '../../constants/theme';

const makeOrderListWithStatus = () =>
  createSelector(
    state => state.orderReducer.orderList,
    (_, status) => status,
    (orderList, status) =>
      orderList.filter(
        el => el.status === status[0] || el.status === status[1],
      ),
  );

export default function NewOrderScreen({ status, fetchOrder }) {
  const selectOrderListWithStatus = useMemo(makeOrderListWithStatus, []);
  const orderListWithStatusValue = useSelector(state =>
    selectOrderListWithStatus(state, status),
  );
  const restId = useSelector(
    state => state.restaurantReducer.restaurantInfo._id,
  );
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orderListWithStatusValue}
        keyExtractor={item => `${item._id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <NewOrderItem
            item={item}
            onPress={() => {
              setIsVisible(true);
              setOrderDetail(item);
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(getOrders(restId))}
            colors={[theme.color.primary]}
            size={30}
          />
        }
      />
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slide"
        height="90%"
        width="100%"
        overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
      >
        <OrderDetail
          orderDetail={orderDetail}
          hideModal={() => setIsVisible(false)}
        />
      </Overlay>
    </View>
  );
}
