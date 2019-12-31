/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { navigate, goBack } from '../services/NavigationService';
import * as authTypes from '../constants/authTypes';
import * as userTypes from '../constants/userTypes';
import * as uiTypes from '../constants/uiTypes';
import { fetchingUserInfo } from '../actions/userActions';
import AuthAPI from '../services/AuthService';
import UserAPI from '../services/UserService';

const uniqueId = state => state.auth.uniqueId;

function* taskAuth({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(AuthAPI.login, payload.loginInput);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: authTypes.LOGIN_ERROR,
      payload: {
        error: message,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.merchantLogin) {
    const { merchantId, authToken } = res.data.merchantLogin;
    yield put({
      type: authTypes.LOGIN_SUCCESS,
      payload: {
        merchantId,
        authToken,
      },
    });
    yield put(fetchingUserInfo(merchantId, authToken));
    // yield delay(1500);
    // yield put({
    //   type: uiTypes.HIDE_LOADING,
    // });
  }
}

function* taskSignOut({ payload }) {
  try {
    const uniqueIdValue = yield select(uniqueId);
    yield call(AsyncStorage.clear);
    yield call(UserAPI.clearDevice, uniqueIdValue);
    yield put({
      type: authTypes.SIGN_OUT_SUCCESS,
    });
    navigate('Auth', null);
  } catch (error) {
    yield put({
      type: authTypes.SIGN_OUT_ERROR,
      payload: {
        error,
      },
    });
  }
}

function* taskSignUp({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(AuthAPI.signup, payload.merchantInput);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: authTypes.SIGN_UP_ERROR,
      payload: {
        error: message,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    alert(message);
  } else if (res.data.createMerchant) {
    yield put({
      type: authTypes.SIGN_UP_SUCCESS,
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    Alert.alert('Success', 'You have successfully registered', [
      { text: 'OK', onPress: () => goBack(null) },
    ]);
  }
}

function* authSaga() {
  yield takeLatest(authTypes.LOGIN, taskAuth);
  yield takeLatest(authTypes.SIGN_OUT, taskSignOut);
  yield takeLatest(authTypes.SIGN_UP, taskSignUp);
}

export default authSaga;
