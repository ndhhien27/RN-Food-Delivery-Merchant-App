/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { ListItem, Overlay, Button, Input } from 'react-native-elements';
import { theme } from '../../constants/theme';
import ModalNewFood from './ModalNewFood';
import { currencyFormat } from '../../utils/string';

const makeFoodsWithDishType = () =>
  createSelector(
    state => state.restaurantReducer.menu,
    (_, dishTypeId) => dishTypeId,
    (menu, dishTypeId) => menu.filter(el => el._id === dishTypeId),
  );

export default function FoodList({ navigation }) {
  const { foods, dishType, dishTypeId } = navigation.state.params;
  const selectFoodsWithDishType = useMemo(makeFoodsWithDishType, []);
  const foodsWithDishTypeValue = useSelector(state =>
    selectFoodsWithDishType(state, dishTypeId),
  );
  const [isVisible, setIsVisible] = useState(false);
  const togleModal = () =>
    setIsVisible(prev => {
      return !prev;
    });
  useEffect(() => {
    navigation.setParams({ addDishType: togleModal });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        titleStyle={styles.itemTitle}
        bottomDivider
        chevron
        rightElement={
          <Text style={styles.price}>
            {currencyFormat(item.price.value.toString())}đ
          </Text>
        }
        onPress={() =>
          navigation.navigate('FoodDetail', {
            dishType,
            foodName: item.name,
            price: item.price,
          })
        }
        containerStyle={{ paddingLeft: 0 }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={foodsWithDishTypeValue[0].foods}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingLeft: 16, paddingTop: 16 }}
        ListHeaderComponent={<Text style={styles.title}>{dishType}</Text>}
      />
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationType="slide"
        // borderRadius={16}
        height="90%"
        width="100%"
        overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
      >
        <ModalNewFood
          dishType={dishType}
          dishTypeId={dishTypeId}
          hideModal={() => setIsVisible(false)}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontFamily: theme.text.fonts.sfpd,
    fontSize: theme.text.size.lg,
  },
  itemSubtitle: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
  price: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.primary,
  },
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.xl,
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
});
