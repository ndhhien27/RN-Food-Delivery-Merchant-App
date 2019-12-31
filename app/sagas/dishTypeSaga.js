/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { navigate } from '../services/NavigationService';
import * as restaurantTypes from '../constants/restaurantTypes';
import * as uiTypes from '../constants/uiTypes';
import RestAPI from '../services/RestaurantService';
// import UserAPI from '../services/UserService';

function* taskCreateDishType({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(RestAPI.createDishType, payload.dishTypeInput);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: restaurantTypes.CREATE_DISH_TYPE_ERROR,
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
  } else if (res.data.createDishType) {
    const newDishType = res.data.createDishType;
    yield put({
      type: restaurantTypes.CREATE_DISH_TYPE_SUCCESS,
      payload: {
        newDishType,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    alert('Success');
  }
}

function* taskUpdateOrder({ payload }) {
  const res = yield call(OrderAPI.updateOrder, payload.orderId, payload.status);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: restaurantTypes.UPDATE_ORDER_ERROR,
      payload: {
        error: message,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: restaurantTypes.HIDE_LOADING,
    // });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.updateOrder) {
    yield put({
      type: restaurantTypes.UPDATE_ORDER_SUCCESS,
      payload: {
        orderHasUpdated: res.data.updateOrder,
      },
    });
  }
}

function* dishTypeSaga() {
  yield takeLatest(restaurantTypes.CREATE_DISH_TYPE, taskCreateDishType);
}

export default dishTypeSaga;
