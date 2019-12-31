/* eslint-disable no-underscore-dangle */
import * as orderTypes from '../constants/orderTypes';

const initialState = {
  orderList: [],
  fetchingError: null,
  updateError: null,
  cancelError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case orderTypes.FETCHING_ORDER_SUCCESS:
      return {
        ...state,
        orderList: payload.orderList,
      };
    case orderTypes.FETCHING_ORDER_ERROR:
      return {
        ...state,
        fetchingError: payload.error,
      };
    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orderList: state.orderList.map(order =>
          order._id === payload.orderHasUpdated._id
            ? { ...order, status: payload.orderHasUpdated.status }
            : { ...order },
        ),
      };
    case orderTypes.UPDATE_ORDER_ERROR:
      return {
        ...state,
        updateError: payload.error,
      };
    case orderTypes.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        orderList: state.orderList.map(order =>
          order._id === payload.orderHasUpdated._id
            ? { ...order, status: 'cancelled' }
            : { ...order },
        ),
      };
    case orderTypes.CANCEL_ORDER_ERROR:
      return {
        ...state,
        cancelError: payload.error,
      };
    default:
      return state;
  }
};
