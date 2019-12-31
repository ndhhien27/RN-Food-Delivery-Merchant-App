/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../services/AuthService';

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const [authInfo, setAuthInfo] = useState({});

  const storeUserInfo = async () => {
    try {
      console.log('store', userInfo);
      await AsyncStorage.setItem(
        '@auth_token',
        JSON.stringify(userInfo.authToken),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const loadCart = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('cart');
  //     const parsedValue = JSON.parse(value);
  //     // eslint-disable-next-line no-unused-vars
  //     setCart(prevCart => {
  //       return parsedValue || { storeName: '', cartItem: [] };
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const storeAuthContext = data => {
    console.log(data);
    setAuthInfo({ ...data });
  };

  // eslint-disable-next-line no-unused-vars

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        authInfo,
        storeAuthContext,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
