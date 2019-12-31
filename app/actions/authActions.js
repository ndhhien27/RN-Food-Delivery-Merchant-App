/* eslint-disable import/prefer-default-export */
import * as authTypes from '../constants/authTypes';

export const login = loginInput => {
  return {
    type: authTypes.LOGIN,
    payload: {
      loginInput,
    },
  };
};

export const openApp = () => {
  return {
    type: 'AUTO',
  };
};

export const signOut = () => {
  return {
    type: authTypes.SIGN_OUT,
  };
};

export const signUp = merchantInput => {
  return {
    type: authTypes.SIGN_UP,
    payload: {
      merchantInput,
    },
  };
};

export const getDeviceInfo = (fcmToken, uniqueId) => {
  return {
    type: authTypes.GET_DEVICE_INFO,
    payload: {
      fcmToken,
      uniqueId,
    },
  };
};
