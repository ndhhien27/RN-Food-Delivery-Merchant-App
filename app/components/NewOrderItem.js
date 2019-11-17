import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function NewOrderItem({ item }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text>6 món</Text>
        <Text>{`${item.time} minute before`}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Pending</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.space.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  statusContainer: {
    borderWidth: 1,
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 11,
    borderColor: theme.color.red,
  },
  status: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.red,
  },
});
