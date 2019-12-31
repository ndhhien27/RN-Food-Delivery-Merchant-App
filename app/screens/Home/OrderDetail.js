/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormat } from '../../utils/string';
import { theme } from '../../constants/theme';
import { updateOrder, cancelOrder } from '../../actions/orderActions';
import formatDate from '../../helpers/time';

export default function OrderDetail({ orderDetail, hideModal }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  useEffect(() => {
    if (isLoading) hideModal();
  }, [hideModal, isLoading]);
  const renderItem = ({ item }) => (
    <ListItem
      title={item.food.name}
      titleStyle={styles.foodName}
      rightElement={
        <Text style={styles.foodPrice}>{`${item.qty} x ${currencyFormat(
          item.food.price.value.toString(),
        )}đ`}</Text>
      }
      bottomDivider
      containerStyle={{ paddingHorizontal: 0, paddingVertical: 8 }}
    />
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Button
          icon={<Icon name="close" type="material-community" />}
          type="clear"
          buttonStyle={{ padding: 0 }}
          containerStyle={{ position: 'absolute', left: 16 }}
          onPress={hideModal}
        />
        <Text style={styles.headerTitle}>Order detail</Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.orderId}>OrderId-{orderDetail._id}</Text>
          <Text
            style={{
              ...styles.status,
              color: theme.color.darkGray,
              textTransform: 'none',
              fontSize: theme.text.size.sm,
            }}
          >
            {formatDate(orderDetail.createdAt)}
          </Text>
          <Text style={styles.status}>{orderDetail.status}</Text>
          <View style={styles.userInfo}>
            <Text
              style={styles.userName}
            >{`${orderDetail.user.lName} ${orderDetail.user.fName}`}</Text>
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon
              type="material-community"
              name="cellphone-android"
              containerStyle={{ paddingRight: 4 }}
            /> */}
              <Text style={{ ...styles.address }}>
                {orderDetail.user.phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 16,
              }}
            >
              {/* <Icon
              type="material-community"
              name="map-marker-outline"
              containerStyle={{ paddingRight: 4 }}
            /> */}
              <Text style={styles.address}>
                {orderDetail.delivery_position.address}
              </Text>
              {/* <Button
              buttonStyle={{ padding: 0 }}
              type="clear"
              icon={
                <Icon
                  type="material-community"
                  name="map-search-outline"
                  color={theme.color.primary}
                />
              }
            /> */}
            </View>
          </View>
          <View>
            <FlatList
              data={orderDetail.items}
              keyExtractor={item => `${item._id}`}
              renderItem={renderItem}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.titleTotal}>Total</Text>
            <Text style={styles.totalPrice}>
              {`${currencyFormat(orderDetail.total.toString())}đ`}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 20 }}>
          {orderDetail.status === 'pending' && (
            <Button
              title="Accept"
              buttonStyle={styles.btnDelevering}
              titleStyle={styles.titleBtnDelevering}
              containerStyle={{
                paddingBottom: Platform.OS === 'ios' ? 44 : 20,
                paddingHorizontal: 16,
              }}
              onPress={() => {
                dispatch(updateOrder(orderDetail._id, 'accepted'));
                hideModal();
              }}
            />
            // <View
            //   style={{
            //     flexDirection: 'row',
            //     paddingHorizontal: 16,
            //     paddingBottom: 16,
            //   }}
            // >
            //   <Button
            //     buttonStyle={{ backgroundColor: theme.color.primary }}
            //     containerStyle={{ flex: 1 }}
            //     // disabled={orderDetail.status === 'accepted'}
            //     // disabledTitleStyle={{ color: '#fff' }}
            //     title="Accept"
            //     type="solid"
            //     onPress={() => {
            //       dispatch(updateOrder(orderDetail._id, 'accepted'));
            //       hideModal();
            //       // fetchOrders();
            //     }}
            //   />
            //   <View style={{ width: 16 }} />
            //   <Button
            //     buttonStyle={{ borderColor: theme.color.primary }}
            //     containerStyle={{ flex: 1 }}
            //     // disabled={orderDetail.status === 'accepted'}
            //     title="Cancel"
            //     titleStyle={{ color: theme.color.primary }}
            //     type="outline"
            //     // disabledTitleStyle={{ color: '#fff' }}
            //     // titleStyle={{ color: theme.color.red }}
            //     onPress={() => {
            //       dispatch(cancelOrder(orderDetail._id));
            //       hideModal();
            //       // fetchOrders();
            //     }}
            //   />
            // </View>
          )}
          {orderDetail.status === 'accepted' && (
            <Button
              title="Ready for delivery"
              buttonStyle={styles.btnDelevering}
              titleStyle={styles.titleBtnDelevering}
              containerStyle={{
                paddingBottom: Platform.OS === 'ios' ? 44 : 20,
                paddingHorizontal: 16,
              }}
              onPress={() => {
                dispatch(updateOrder(orderDetail._id, 'delivering'));
                // fetchOrders();
              }}
            />
          )}
          {orderDetail.status === 'delivering' && (
            <Button
              title="Completed"
              loading={!!isLoading}
              buttonStyle={styles.btnDelevering}
              titleStyle={styles.titleBtnDelevering}
              containerStyle={{
                paddingBottom: Platform.OS === 'ios' ? 44 : 20,
                paddingHorizontal: 16,
              }}
              onPress={() => {
                dispatch(updateOrder(orderDetail._id, 'completed'));
                // fetchOrders();
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flex: 1,
  },
  btnGroup: {
    marginBottom: 44,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.color.gray,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.lg,
    color: theme.color.primary,
  },
  userName: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.lg,
  },
  address: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
  orderId: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.lg,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 16,
    // marginTop: 32,
  },
  titleTotal: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.xl,
    textTransform: 'uppercase',
    color: theme.color.primary,
  },
  totalPrice: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.xl,
    color: theme.color.primary,
  },
  userInfo: {
    borderBottomWidth: 1,
    borderColor: theme.color.gray,
    paddingVertical: 8,
  },
  foodName: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.md,
  },
  foodPrice: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.md,
  },
  btnDelevering: {
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.color.primary,
  },
  titleBtnDelevering: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.lg,
  },
  status: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.primary,
    textTransform: 'uppercase',
  },
});
