/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { Input, Overlay, ListItem } from 'react-native-elements';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import FieldWrapper from './FieldWrapper';
import { theme } from '../constants/theme';

const StyledSelector = ({ onPress, formikKey, formikProps }) => {
  return (
    <FieldWrapper formikKey={formikKey} formikProps={formikProps}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 44,
          backgroundColor: theme.color.gray,
          borderRadius: 8,
        }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Dish type</Text>
          <Text style={styles.subTitle}>{formikProps.values[formikKey]}</Text>
        </View>
      </TouchableOpacity>
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: theme.color.gray,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: theme.color.red,
    borderWidth: 1,
  },
  normal: {
    backgroundColor: theme.color.gray,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
  subTitle: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.lg,
    color: theme.color.primary,
    marginLeft: 16,
  },
});

export default StyledSelector;
