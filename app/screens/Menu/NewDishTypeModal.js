/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import { theme } from '../../constants/theme';
import StyledInput from '../../components/StyledInput';
import SelectDishType from './Modal/SelectDishType';
import { createDishType } from '../../actions/restaurantActions';

const validationSchema = yup.object().shape({
  dishType: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('DishType')
    .min(4)
    .required(),
});

export default function NewDishTypeModal({ onPress, data }) {
  const [isVisible, setIsVisible] = useState(false);
  const restId = useSelector(
    state => state.restaurantReducer.restaurantInfo._id,
  );
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const createDishTypeError = useSelector(
    state => state.restaurantReducer.createDishTypeError,
  );
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ dishType: '' }}
      onSubmit={(values, actions) => {
        const dishTypeInput = {
          restaurant: restId,
          name: values.dishType,
        };
        dispatch(createDishType(dishTypeInput));
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <View style={{ flex: 1 }}>
          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
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
                type="clear"
                title="Cancel"
                buttonStyle={{ padding: 0 }}
                titleStyle={{ color: theme.color.primary }}
                onPress={onPress}
              />
              <Text style={styles.modalTitle}>New dish type</Text>
              <Button
                type="clear"
                title="Done"
                disabled={!formikProps.values.dishType}
                onPress={formikProps.handleSubmit}
                buttonStyle={{ padding: 0 }}
                titleStyle={{ color: theme.color.primary }}
              />
            </View>
          )}
          <KeyboardAwareScrollView
            style={{ borderRadius: 16, flex: 1 }}
            contentContainerStyle={{
              paddingVertical: 22,
              paddingHorizontal: 16,
            }}
          >
            <StyledInput
              formikProps={formikProps}
              formikKey="dishType"
              placeholder="Enter new dish type"
            />
            {isLoading && (
              <ActivityIndicator color={theme.color.primary} size="large" />
            )}
          </KeyboardAwareScrollView>
          <Overlay
            isVisible={isVisible}
            animationType="fade"
            onBackdropPress={() => setIsVisible(false)}
            windowBackgroundColor="transparent"
            height="80%"
            width="100%"
            overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
          >
            <SelectDishType
              data={data}
              formikPropsParent={formikProps}
              formikKeyParent="dishType"
              hideModal={() => setIsVisible(false)}
            />
          </Overlay>
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
    color: theme.color.primary,
  },
});
