/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { navigate } from '../services/NavigationService';
import * as restaurantTypes from '../constants/restaurantTypes';
import * as uiTypes from '../constants/uiTypes';
import RestAPI from '../services/RestaurantService';
import { findPath } from '../helpers/array';
// import UserAPI from '../services/UserService';

const restReducer = state => state.restaurantReducer;

function* taskCreateFood({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(RestAPI.createFood, payload.foodInput);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: restaurantTypes.CREATE_FOOD_ERROR,
      payload: {
        error: message,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    alert(message);
    // alert(message);
  } else if (res.data.createFood) {
    const newFood = res.data.createFood;
    yield put({
      type: restaurantTypes.CREATE_FOOD_SUCCESS,
      payload: {
        newFood,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    alert('Success');
  }
}

function* foodSaga() {
  yield takeLatest(restaurantTypes.CREATE_FOOD, taskCreateFood);
}

export default foodSaga;
