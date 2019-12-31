/* eslint-disable no-underscore-dangle */
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Button, Input } from 'react-native-elements';
// import { theme } from '../../constants/theme';

// export default function ModalNewFood() {
//   return (
//     <View style={{ flex: 1 }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           borderBottomWidth: 1,
//           borderColor: theme.color.gray,
//           height: 60,
//         }}
//       >
//         <Button type="clear" title="Cancel" />
//         <Text style={styles.modalTitle}>New food</Text>
//         <Button type="clear" title="Done" />
//       </View>
//       <View style={{ backgroundColor: theme.color.grayLight, flex: 1 }}>
//         <Input
//           autoFocus
//           placeholder="Enter new food name"
//           placeholderTextColor={theme.color.darkGray}
//           containerStyle={{
//             backgroundColor: '#fff',
//             paddingLeft: 16,
//             paddingRight: 0,
//           }}
//           inputContainerStyle={{
//             borderBottomColor: theme.color.gray,
//           }}
//         />
//         <Input
//           placeholder="Enter price"
//           placeholderTextColor={theme.color.darkGray}
//           containerStyle={{
//             backgroundColor: '#fff',
//             paddingHorizontal: 0,
//           }}
//           inputContainerStyle={{
//             borderBottomColor: theme.color.gray,
//             paddingLeft: 16,
//           }}
//           keyboardType="number-pad"
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   modalTitle: {
//     fontFamily: theme.text.fonts['sfpt-bold'],
//     fontSize: theme.text.size.md,
//   },
// });
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../../constants/theme';
import StyledInput from '../../components/StyledInput';
import { createFood } from '../../actions/restaurantActions';

const validationSchema = yup.object().shape({
  foodName: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('FoodName')
    .required()
    .min(4, 'Seems a bit short...'),
  price: yup
    .string()
    .matches(/^[0-9]*$/, 'Must be a Number')
    .label('Price')
    .min(4)
    .required(),
});

export default function NewDishTypeModal({ hideModal, dishType, dishTypeId }) {
  const dispatch = useDispatch();
  const restId = useSelector(
    state => state.restaurantReducer.restaurantInfo._id,
  );
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  return (
    <Formik
      initialValues={{ foodName: '', price: '' }}
      onSubmit={(values, actions) => {
        const newFood = {
          restaurant: restId,
          name: values.foodName,
          price: {
            unit: 'đ',
            value: parseFloat(values.price),
          },
          dishType: dishTypeId,
        };
        dispatch(createFood(newFood));
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
                titleStyle={{ color: theme.color.primary }}
                buttonStyle={{ padding: 0 }}
                onPress={hideModal}
              />
              <Text style={styles.modalTitle}>New food</Text>
              <Button
                type="clear"
                title="Done"
                titleStyle={{ color: theme.color.primary }}
                onPress={formikProps.handleSubmit}
                buttonStyle={{ padding: 0 }}
              />
            </View>
          )}
          <View style={styles.dishTypeContainer}>
            <Text style={styles.dishType}>{dishType}</Text>
          </View>
          <KeyboardAwareScrollView
            style={{ borderRadius: 16, flex: 1 }}
            contentContainerStyle={{
              paddingVertical: 22,
              paddingHorizontal: 16,
            }}
          >
            <StyledInput
              formikProps={formikProps}
              formikKey="foodName"
              placeholder="Food name"
            />
            <StyledInput
              formikProps={formikProps}
              formikKey="price"
              placeholder="Price"
              keyboardType="number-pad"
            />
            {isLoading && (
              <ActivityIndicator color={theme.color.primary} size="large" />
            )}
          </KeyboardAwareScrollView>
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
  dishType: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
  dishTypeContainer: {
    paddingLeft: 16,
    paddingTop: 16,
  },
});
