/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../../constants/theme';
import StyledInput from '../../components/StyledInput';
import API from '../../services/AuthService';
import { signUp } from '../../actions/authActions';

const validationSchema = yup.object().shape({
  fName: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('First name')
    .required(),
  lName: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Last name')
    .required(),
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, 'Must be a Number')
    .label('Phone')
    .min(4)
    .max(10)
    .required(),
  password: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Password')
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function(value) {
      return this.parent.password === value;
    }),
  // position: yup.object().shape({
  //   address: yup
  //     .string()
  //     .label('Address')
  //     .required(),
  //   lat: yup.number().required(),
  //   long: yup.number().required(),
  // }),
});

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View
        style={{
          paddingHorizontal: 16,
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 88 : 56,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create an account</Text>
        </View>
        <Formik
          enableReinitialize
          initialValues={{
            fName: '',
            lName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            // position: {
            //   address: '',
            //   lat: 0,
            //   long: 0,
            // },
          }}
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values));
            dispatch(signUp(values));
            // actions.resetForm({
            //   fName: '',
            // });
          }}
          validationSchema={validationSchema}
        >
          {formikProps => (
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                // style={{ flex: 1 }}
              >
                <StyledInput
                  formikProps={formikProps}
                  formikKey="fName"
                  placeholder="First name"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="lName"
                  placeholder="Last name"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="email"
                  placeholder="Email"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="phone"
                  placeholder="Phone"
                  keyboardType="number-pad"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="confirmPassword"
                  placeholder="Comfirm Password"
                  secureTextEntry
                />
                {/* <StyledInput
                  formikProps={formikProps}
                  formikKey="position.address"
                  editable={false}
                  placeholder="Address"
                  defaultValue={formikProps.values.position.address}
                  rightIcon={
                    <Icon
                      type="material-community"
                      name="map-marker"
                      color={theme.color.darkGray}
                      onPress={() =>
                        navigation.navigate('SelectPosition', {
                          formikProps,
                          formikKey: 'position.address',
                          latKey: 'position.lat',
                          longKey: 'position.long',
                        })
                      }
                    />
                  }
                /> */}
                {/* <Button
                  title="Address"
                  onPress={() => navigation.navigate('MapScreen')}
                /> */}
                {isLoading ? (
                  <ActivityIndicator
                    size={44}
                    style={{ paddingTop: 30 }}
                    color={theme.color.primary}
                  />
                ) : (
                  <View style={{ paddingTop: 30 }}>
                    <Button
                      title="Sign up"
                      titleStyle={{
                        fontFamily: theme.text.fonts.sfpt,
                        fontSize: theme.text.size.lg,
                      }}
                      buttonStyle={{
                        padding: 0,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: theme.color.primary,
                      }}
                      onPress={formikProps.handleSubmit}
                    />
                    <Button
                      title="Go back Login"
                      titleStyle={{
                        fontFamily: theme.text.fonts.sfpt,
                        fontSize: theme.text.size.lg,
                        color: theme.color.primary,
                      }}
                      type="clear"
                      buttonStyle={{
                        padding: 0,
                        height: 44,
                        borderRadius: 22,
                      }}
                      onPress={() => navigation.goBack()}
                    />
                  </View>
                )}
              </KeyboardAwareScrollView>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
  modalTitle: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
});

SignupScreen.navigationOptions = () => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: '#fff',
      shadowOpacity: 0,
    },
  };
};
