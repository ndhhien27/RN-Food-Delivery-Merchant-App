/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { AirbnbRating } from 'react-native-elements';
import { theme } from '../constants/theme';
import formatDate from '../helpers/time';
import { fetchingRestaurant } from '../actions/restaurantActions';

const getReviewsByRestaurant = createSelector(
  state => state.restaurantReducer.restaurantInfo.orders,
  orders => orders.filter(order => order.review.star !== null),
);

export default function ReviewScreen({ navigation }) {
  const reviews = useSelector(state => getReviewsByRestaurant(state));
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <View>
        {!item && null}
        {item && (
          <View style={styles.container}>
            <Text
              style={styles.name}
            >{`${item.user.lName} ${item.user.fName}`}</Text>
            <Text style={styles.orderId}>{`OrderId-${item._id}`}</Text>
            <Text style={styles.date}>{formatDate(item.updatedAt)}</Text>
            <View style={{ alignItems: 'flex-start' }}>
              <AirbnbRating
                defaultRating={item.review.star}
                isDisabled
                showRating={false}
                size={20}
                starContainerStyle={{
                  paddingLeft: 0,
                }}
              />
            </View>
            <Text style={styles.desc}>{item.review.description}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchingRestaurant())}
            colors={[theme.color.primary]}
          />
        }
        data={reviews}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
  desc: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
  orderId: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.darkGray,
  },
  date: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
  container: {
    borderBottomWidth: 1,
    borderColor: theme.color.gray,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
