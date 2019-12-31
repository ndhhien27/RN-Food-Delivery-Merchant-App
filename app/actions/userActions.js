/* eslint-disable import/prefer-default-export */
import * as userTypes from '../constants/userTypes';

export const fetchingUserInfo = (merchantId, token) => {
  return {
    type: userTypes.FETCHING_USER_INFO,
    payload: {
      merchantId,
      token,
    },
  };
};

export const createRestaurant = restaurantInput => {
  return {
    type: userTypes.CREATE_RESTAURANT,
    payload: {
      restaurantInput,
    },
  };
};

export const getCurrentLocation = (lat, long) => {
  return {
    type: userTypes.GET_CURRENT_LOCATION,
    payload: {
      lat,
      long,
    },
  };
};
