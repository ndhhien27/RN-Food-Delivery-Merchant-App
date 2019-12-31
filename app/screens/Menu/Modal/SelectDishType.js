/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { theme } from '../../../constants/theme';
import { setIsSelected } from '../../../utils/array';
import InputToggle from '../../../components/InputToggle';

const validationSchema = yup.object().shape({
  newDishType: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('DishType')
    .required(),
});

export default function SelectDishType({
  data,
  formikPropsParent,
  formikKeyParent,
  hideModal,
}) {
  const [dishTypeList, setDishTypeList] = useState(setIsSelected(data));
  useEffect(() => {
    checkSelected(formikPropsParent.values[formikKeyParent]);
    return () => {
      console.log('unmount');
    };
  }, []);
  const save = newDishType => {
    formikPropsParent.setFieldValue(formikKeyParent, newDishType);
    hideModal();
  };
  const selectItem = item => {
    setDishTypeList(prev => {
      return prev.map(el =>
        el._id !== item._id
          ? { ...el, isSelected: false }
          : { ...el, isSelected: true },
      );
    });
  };
  const checkSelected = itemSelectedName => {
    setDishTypeList(prev => {
      return prev.map(el =>
        el.name === itemSelectedName ? { ...el, isSelected: true } : { ...el },
      );
    });
  };
  return (
    <Formik
      initialValues={{ newDishType: formikPropsParent.values[formikKeyParent] }}
      onSubmit={(values, actions) => {
        // alert(JSON.stringify(values));
        save(values.newDishType);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: theme.color.gray,
              height: 60,
              width: '100%',
              paddingHorizontal: 16,
              backgroundColor: '#fff',
            }}
          >
            <Button
              icon={
                <Icon
                  type="material-community"
                  name="chevron-left"
                  color={theme.color.primary}
                  containerStyle={{ padding: 0 }}
                  size={28}
                />
              }
              title="Back"
              type="clear"
              buttonStyle={{ padding: 0, marginLeft: -10 }}
              onPress={hideModal}
            />
            <Text style={styles.modalTitle}>Choose dish type</Text>
            <Button
              type="clear"
              title="Done"
              buttonStyle={{ padding: 0 }}
              onPress={formikProps.handleSubmit}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: theme.color.grayLight }}>
            <FlatList
              data={dishTypeList}
              keyExtractor={item => `${item._id}`}
              renderItem={({ item }) => (
                <ListItem
                  title={item.name}
                  rightIcon={
                    <Icon
                      type="material-community"
                      name="check-circle-outline"
                      opacity={item.isSelected ? 1 : 0}
                      color={theme.color.primary}
                      size={theme.icon.size.md}
                    />
                  }
                  bottomDivider
                  onPress={() => {
                    formikProps.setFieldValue('newDishType', item.name);
                    selectItem(item);
                  }}
                />
              )}
              ListHeaderComponent={
                <InputToggle
                  formikProps={formikProps}
                  formikKey="newDishType"
                  setDishTypeList={setDishTypeList}
                />
              }
            />
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
});
