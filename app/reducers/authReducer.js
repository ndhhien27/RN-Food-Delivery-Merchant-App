import * as authTypes from '../constants/authTypes';
import { navigate } from '../services/NavigationService';

const initialState = {
  merchantId: '',
  authToken: '',
  userInfo: {},
  loginError: null,
  signOutError: null,
  signUpError: null,
  fcmToken: null,
  uniqueId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        merchantId: payload.merchantId,
        authToken: payload.authToken,
      };
    case authTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: payload.error,
      };
    case authTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authToken: '',
        merchantId: '',
      };
    case authTypes.SIGN_OUT_ERROR:
      return {
        ...state,
        signOutError: payload.error,
      };
    case authTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
      };
    case authTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: payload.error,
      };
    case authTypes.GET_DEVICE_INFO:
      return {
        ...state,
        fcmToken: payload.fcmToken,
        uniqueId: payload.uniqueId,
      };
    case 'AUTO':
      navigate('Main', null);
      return state;
    default:
      return state;
  }
};
