/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import time, { diffTime } from '../helpers/time';

export default function NewOrderItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Text
            style={styles.name}
          >{`${item.user.lName} ${item.user.fName}`}</Text>
          <Text style={styles.subTitle}>{`${item.items.length} dishes`}</Text>
          <Text>{time(item.createdAt)}</Text>
        </View>
        <View>
          <Text
            style={
              ['pending', 'cancelled'].includes(item.status)
                ? styles.status
                : item.status === 'delivering'
                ? styles.deliveringStatus
                : item.status === 'accepted'
                ? styles.acceptedStatus
                : styles.completedStatus
            }
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.space.xs,
    borderBottomWidth: 1,
    borderColor: theme.color.gray,
    paddingLeft: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  name: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  subTitle: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
  },
  statusContainer: {
    borderWidth: 1,
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 11,
    borderColor: theme.color.red,
  },
  status: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.sm,
    color: theme.color.red,
    textTransform: 'uppercase',
  },
  acceptedStatus: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.sm,
    color: theme.color.lightBlue,
    textTransform: 'uppercase',
  },
  completedStatus: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.sm,
    color: theme.color.lightGreen,
    textTransform: 'uppercase',
  },
  deliveringStatus: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.sm,
    color: '#ff9a00',
    textTransform: 'uppercase',
  },
});
