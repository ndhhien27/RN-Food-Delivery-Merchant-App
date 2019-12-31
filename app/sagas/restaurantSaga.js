/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { navigate } from '../services/NavigationService';
import * as restaurantTypes from '../constants/restaurantTypes';
import * as userTypes from '../constants/userTypes';
import * as uiTypes from '../constants/uiTypes';
import RestAPI from '../services/RestaurantService';
// import UserAPI from '../services/UserService';

const userInfo = state => state.userReducer.userInfo;
const restaurantInfo = state => state.restaurantReducer.restaurantInfo;

function* taskFetchingRest({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const restaurantInfoValue = yield select(restaurantInfo);
  const restId = payload.restId || restaurantInfoValue._id;
  const res = yield call(RestAPI.fetchingRestaurant, restId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: restaurantTypes.FETCHING_RESTAURANT_ERROR,
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
  } else if (res.data.restaurantById) {
    yield put({
      type: restaurantTypes.FETCHING_RESTAURANT_SUCCESS,
      payload: {
        restaurantInfo: res.data.restaurantById,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    navigate('Main', null);
  }
}

function* taskFetchingMenu({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(RestAPI.getMenu, payload.restId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: restaurantTypes.FETCHING_MENU_ERROR,
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
  } else if (res.data.menuByRestaurant) {
    yield put({
      type: restaurantTypes.FETCHING_MENU_SUCCESS,
      payload: {
        menu: res.data.menuByRestaurant,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
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

function* restaurantSaga() {
  yield takeLatest(restaurantTypes.FETCHING_RESTAURANT, taskFetchingRest);
  yield takeLatest(restaurantTypes.FETCHING_MENU, taskFetchingMenu);
}

export default restaurantSaga;
