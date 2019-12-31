/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { navigate } from '../services/NavigationService';
import { removeQuotes } from '../helpers/string';
import { fetchingUserInfo } from '../actions/userActions';
import { theme } from '../constants/theme';

export default function AuthLoadingScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    // clearStorage();
    loadAuthToken();
  }, []);

  const clearStorage = async () => {
    await AsyncStorage.clear();
    const auth = await AsyncStorage.getItem('persist:auth');
    const authParse = JSON.parse(auth);
    console.log('auth', authParse);
    navigate('Auth');
  };

  const loadAuthToken = async () => {
    const auth = await AsyncStorage.getItem('persist:auth');
    const authParse = JSON.parse(auth);
    // console.log('auth', authParse);
    // console.log(removeQuotes(authParse.authToken));
    if (!authParse) navigate('Auth', null);
    else if (removeQuotes(authParse.authToken)) {
      const merchantId = removeQuotes(authParse.merchantId);
      dispatch(fetchingUserInfo(merchantId, removeQuotes(authParse.authToken)));
    } else navigate('Auth', null);
  };
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Image
        source={require('../assets/logo/logo.png')}
        resizeMode="cover"
        style={{ width: 300, height: 300 }}
      />
      <ActivityIndicator
        size="large"
        style={{ marginTop: 30 }}
        color={theme.color.primary}
      />
    </View>
  );
}
