/* eslint-disable import/prefer-default-export */
import * as orderTypes from '../constants/orderTypes';

export const getOrders = restId => {
  return {
    type: orderTypes.FETCHING_ORDER,
    payload: {
      restId,
    },
  };
};

export const updateOrder = (orderId, status) => {
  return {
    type: orderTypes.UPDATE_ORDER,
    payload: {
      orderId,
      status,
    },
  };
};

export const cancelOrder = orderId => {
  return {
    type: orderTypes.CANCEL_ORDER,
    payload: {
      orderId,
    },
  };
};
