/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { theme } from '../../constants/theme';

const validationSchema = yup.object().shape({
  dishType: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('DishType')
    .required(),
  foodName: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('FoodName')
    .required()
    .min(2, 'Seems a bit short...')
    .max(50, 'We prefer insecure system, try a shorter Food name.'),
  price: yup
    .string()
    .matches(/^[0-9]*$/, 'Must be a Number')
    .label('Price')
    .min(4)
    .required(),
});

const Item = ({ label, formik, formikKey }) => (
  <View style={styles.itemContainer}>
    <Input
      label={label}
      labelStyle={styles.label}
      defaultValue={formik.values[formikKey].toString()}
      inputStyle={styles.value}
      onChangeText={formik.handleChange(formikKey)}
      onBlur={formik.handleBlur(formikKey)}
      clearButtonMode="always"
      errorMessage={formik.touched[formikKey] && formik.errors[formikKey]}
      errorStyle={{
        fontFamily: theme.text.fonts.sfpt,
        fontSize: theme.text.size.sm,
      }}
    />
  </View>
);

export default function FoodDetail({ navigation }) {
  const { dishType, foodName, price } = navigation.state.params;
  const formik = useFormik({
    initialValues: {
      dishType,
      foodName,
      price: price.value,
    },
    validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    navigation.setParams({ formik });
  }, []);
  return (
    <View>
      {/* <HeaderCustom leftTitle="Menu" formik={formik} rightTitle="Save"/> */}
      <Item label="Dish type" formik={formik} formikKey="dishType" />
      <Item label="Food name" formik={formik} formikKey="foodName" />
      <Item label="Price (đ)" formik={formik} formikKey="price" />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size.lg,
    marginVertical: 8,
  },
  value: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.xl,
  },
  itemContainer: {
    paddingVertical: 8,
  },
});
