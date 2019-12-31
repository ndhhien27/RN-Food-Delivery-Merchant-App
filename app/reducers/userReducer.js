import * as userTypes from '../constants/userTypes';

const initialState = {
  userInfo: {},
  currentLocation: null,
  fetchingError: null,
  createRestError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.FETCHING_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: payload.userInfo,
      };
    case userTypes.FETCHING_USER_INFO_ERROR:
      return {
        ...state,
        fetchingError: payload.error,
      };
    case userTypes.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          createdRestaurants: { ...payload.newRest },
        },
      };
    case userTypes.CREATE_RESTAURANT_ERROR:
      return {
        ...state,
        createRestError: payload.error,
      };
    case userTypes.GET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: {
          lat: payload.lat,
          long: payload.long,
        },
      };
    default:
      return state;
  }
};
