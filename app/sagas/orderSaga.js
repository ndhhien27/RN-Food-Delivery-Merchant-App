/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { navigate } from '../services/NavigationService';
import * as orderTypes from '../constants/orderTypes';
import * as userTypes from '../constants/userTypes';
import * as uiTypes from '../constants/uiTypes';
import OrderAPI from '../services/OrderService';
// import UserAPI from '../services/UserService';

function* taskFetchingOrder({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(OrderAPI.getOrders, payload.restId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: orderTypes.FETCHING_ORDER_ERROR,
      payload: {
        fetchingError: message,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.ordersByRestaurant) {
    yield put({
      type: orderTypes.FETCHING_ORDER_SUCCESS,
      payload: {
        orderList: res.data.ordersByRestaurant,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
    navigate('Main', null);
  }
}

function* taskUpdateOrder({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(OrderAPI.updateOrder, payload.orderId, payload.status);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: orderTypes.UPDATE_ORDER_ERROR,
      payload: {
        error: message,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: orderTypes.HIDE_LOADING,
    // });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.updateOrder) {
    yield put({
      type: orderTypes.UPDATE_ORDER_SUCCESS,
      payload: {
        orderHasUpdated: res.data.updateOrder,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
  }
}

function* taskCancelOrder({ payload }) {
  yield put({
    type: uiTypes.SHOW_LOADING,
  });
  const res = yield call(OrderAPI.cancelOrder, payload.orderId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: orderTypes.CANCEL_ORDER_ERROR,
      payload: {
        error: message,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: orderTypes.HIDE_LOADING,
    // });
    alert(message);
  } else if (res.data) {
    yield put({
      type: orderTypes.CANCEL_ORDER_SUCCESS,
      payload: {
        orderHasUpdated: res.data.merchantCancelOrder,
      },
    });
    yield delay(1000);
    yield put({
      type: uiTypes.HIDE_LOADING,
    });
  }
}

function* orderSaga() {
  yield takeLatest(orderTypes.FETCHING_ORDER, taskFetchingOrder);
  yield takeLatest(orderTypes.CANCEL_ORDER, taskCancelOrder);
  yield takeLatest(orderTypes.UPDATE_ORDER, taskUpdateOrder);
}

export default orderSaga;
