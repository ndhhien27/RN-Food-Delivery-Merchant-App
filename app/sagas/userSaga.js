/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../services/NavigationService';
import * as userTypes from '../constants/userTypes';
import * as uiTypes from '../constants/uiTypes';
import UserAPI from '../services/UserService';
import { removeQuotes } from '../helpers/string';

function* taskFetchingUserInfo({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const authStorage = yield call(AsyncStorage.getItem, 'persist:auth');
  const authData = JSON.parse(authStorage);
  console.log('Storaaage', authData.authToken);
  const res = yield call(
    UserAPI.getMerchantInfo,
    payload.merchantId,
    payload.token,
  );
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: userTypes.FETCHING_USER_INFO_ERROR,
      payload: {
        error: message,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    navigate('Auth', null);
    // alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.merchantById) {
    yield put({
      type: userTypes.FETCHING_USER_INFO_SUCCESS,
      payload: {
        userInfo: res.data.merchantById,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    if (res.data.merchantById.createdRestaurants) navigate('Tab', null);
    else navigate('NewRest', null);
  }
}

function* taskCreateRest({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const auth = yield call(AsyncStorage.getItem, 'persist:auth');
  const authParse = JSON.parse(auth);
  const merchant = removeQuotes(authParse.merchantId);
  newRestaurantInput = {
    ...payload.restaurantInput,
    merchant,
  };
  const res = yield call(UserAPI.createdRestaurant, newRestaurantInput);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: userTypes.CREATE_RESTAURANT_ERROR,
      payload: {
        error: message,
      },
    });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.createRestaurant) {
    yield put({
      type: userTypes.CREATE_RESTAURANT_SUCCESS,
      payload: {
        newRest: res.data.createRestaurant,
      },
    });
    navigate('Tab', null);
  }
  yield delay(1000);
  yield put({
    type: uiTypes.HIDE_LOADING,
  });
}

function* taskUpdateUserInfo({ payload }) {
  const res = yield call(
    UserAPI.updateUser,
    payload.merchantId,
    payload.updateValue,
  );
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: authTypes.UPDATE_USER_INFO_ERROR,
      payload: {
        error: message,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: authTypes.HIDE_LOADING,
    // });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.updateUser) {
    yield put({
      type: authTypes.UPDATE_USER_INFO_SUCCESS,
      payload: {
        userInfo: res.data.updateUser,
      },
    });
  }
}

function* userSaga() {
  yield takeLatest(userTypes.FETCHING_USER_INFO, taskFetchingUserInfo);
  yield takeLatest(userTypes.CREATE_RESTAURANT, taskCreateRest);
  // yield takeLatest(authTypes.UPDATE_USER_INFO, taskUpdateUserInfo);
}

export default userSaga;
