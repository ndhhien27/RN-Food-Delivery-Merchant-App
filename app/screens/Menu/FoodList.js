/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Text, FlatList } from 'react-native';

export default function FoodList({ navigation }) {
  const { foods } = navigation.state.params;
  return (
    <FlatList
      data={foods}
      keyExtractor={item => `${item._id}`}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
