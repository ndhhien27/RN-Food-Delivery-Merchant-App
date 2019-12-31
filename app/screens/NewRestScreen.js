/* eslint-disable no-alert */
/* eslint-disable no-undef */
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
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';
import StyledInput from '../components/StyledInput';
import SelectPositionModal from './SelectPositionModal';
import { createRestaurant } from '../actions/userActions';
import { signOut } from '../actions/authActions';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Name')
    .required()
    .min(4, 'Seems a bit short...'),
  cuisines: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Cuisines')
    .required()
    .min(4, 'Seems a bit short...'),
  position: yup.object().shape({
    address: yup
      .string()
      .label('Address')
      .required(),
    lat: yup.number().required(),
    long: yup.number().required(),
  }),
});

function NewRestScreen({ onPress, dishType, dishTypeId, navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>New Restaurant</Text>
      </View>
      <Formik
        initialValues={{
          name: '',
          cuisines: '',
          position: {
            address: '',
            lat: 0,
            long: 0,
          },
        }}
        onSubmit={(values, actions) => {
          dispatch(createRestaurant(values));
          // alert('Success');
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <View>
            <View
              style={{
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingTop: 16,
              }}
              contentContainerStyle={{
                paddingVertical: 22,
                paddingHorizontal: 16,
              }}
            >
              <StyledInput
                formikProps={formikProps}
                formikKey="name"
                placeholder="Name"
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="cuisines"
                placeholder="Cuisines"
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setIsVisible(true)}
              >
                <StyledInput
                  formikProps={formikProps}
                  formikKey="position.address"
                  editable={false}
                  caretHidden
                  placeholder="Choose address ..."
                  selection={{ start: 0, end: 0 }}
                  defaultValue={formikProps.values.position.address}
                />
              </TouchableOpacity>
              {isLoading ? (
                <ActivityIndicator
                  color={theme.color.primary}
                  size="large"
                  style={{ marginTop: 40 }}
                />
              ) : (
                <>
                  <Button
                    title="Confirm"
                    titleStyle={[styles.titleBtn, { color: '#fff' }]}
                    buttonStyle={{
                      height: 44,
                      marginTop: 40,
                      borderRadius: 22,
                      backgroundColor: theme.color.primary,
                    }}
                    onPress={() => formikProps.handleSubmit()}
                  />
                  <Button
                    type="clear"
                    title="Sign out"
                    titleStyle={styles.titleBtn}
                    onPress={() => dispatch(signOut())}
                  />
                </>
              )}
            </View>
            {/* <Button title="a" onPress={() => console.log('a')} /> */}
            <Overlay
              isVisible={isVisible}
              onBackdropPress={() => setIsVisible(false)}
              animationType="slide"
              height="80%"
              width="100%"
              overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
            >
              <SelectPositionModal
                onPress={() => setIsVisible(false)}
                formikProps={formikProps}
                formikKey="position.address"
                latKey="position.lat"
                longKey="position.long"
              />
            </Overlay>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 88 : 56,
  },
  modalTitle: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
  dishType: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
  dishTypeContainer: {
    paddingLeft: 16,
    paddingTop: 16,
  },
  titleBtn: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.primary,
  },
});

export default withNavigation(NewRestScreen);
