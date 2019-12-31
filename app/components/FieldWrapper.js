/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import { theme } from '../constants/theme';

const FieldWrapper = ({ children, formikProps, formikKey }) => {
  // console.log(_.get(formikProps, `errors.${formikKey}`));
  return (
    <View style={{ marginBottom: 8 }}>
      {children}
      <Text
        style={
          _.get(formikProps, `touched.${formikKey}`) &&
          _.get(formikProps, `errors.${formikKey}`)
            ? styles.errors
            : styles.normal
        }
      >
        {_.get(formikProps, `touched.${formikKey}`) &&
          _.get(formikProps, `errors.${formikKey}`)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  normal: {
    height: 0,
  },
  errors: {
    color: theme.color.red,
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default FieldWrapper;
