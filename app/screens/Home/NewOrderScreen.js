import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import NewOrderItem from '../../components/NewOrderItem';

export default function NewOrderScreen() {
  const [state, setState] = useState([
    {
      id: 1,
      name: 'Nguyen Duc Hien',
      address: '382 Ton Duc Thang, Lien Chieu, Da Nang',
      time: 34,
    },
    {
      id: 2,
      name: 'Nguyen Duc Hien',
      address: '382 Ton Duc Thang, Lien Chieu, Da Nang',
      time: 34,
    },
    {
      id: 3,
      name: 'Nguyen Duc Hien',
      address: '382 Ton Duc Thang, Lien Chieu, Da Nang',
      time: 34,
    },
  ]);
  return (
    <FlatList
      data={state}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => <NewOrderItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
