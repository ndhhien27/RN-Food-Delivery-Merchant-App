/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { theme } from '../../constants/theme';
import StyledInput from '../../components/StyledInput';
import { login } from '../../actions/authActions';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  password: yup
    .string()
    // .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Password')
    .required(),
});

export default function LoginScreen(props) {
  const { navigation } = props;
  const authInfo = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome back</Text>
      </View>
      <Formik
        initialValues={{
          email: '', // ndhienmerchant@gmail.com
          password: '', // hien123456
        }}
        onSubmit={(values, actions) => {
          const loginInput = {
            ...values,
            fcmTokenMerchant: authInfo.fcmToken,
            uniqueId: authInfo.uniqueId,
          };
          dispatch(login(loginInput));
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <View>
            <View>
              <StyledInput
                formikProps={formikProps}
                formikKey="email"
                placeholder="Email"
                // autoFocus
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password"
                secureTextEntry
              />
            </View>
            {isLoading ? (
              <ActivityIndicator
                size={44}
                style={{ paddingTop: 30 }}
                color={theme.color.primary}
              />
            ) : (
              <View style={{ paddingTop: 30 }}>
                <Button
                  title="Login"
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
                  title="Sign up"
                  titleStyle={styles.signUp}
                  type="clear"
                  onPress={() => {
                    navigation.navigate('Signup');
                    // await AsyncStorage.clear();
                  }}
                />
              </View>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 88 : 56,
  },
  text: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: 20,
  },
  signUp: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: 20,
    color: theme.color.primary,
  },
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
  titleContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});

LoginScreen.navigationOptions = () => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: '#fff',
      shadowOpacity: 0,
    },
  };
};
