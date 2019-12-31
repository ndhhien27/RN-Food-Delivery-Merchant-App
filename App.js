/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'react-native-firebase';
import { getUniqueId } from 'react-native-device-info';
import AppSwitch from './AppNavigator';
import store, { persistor } from './app/store';
import { setTopLevelNavigator } from './app/services/NavigationService';
import { getDeviceInfo } from './app/actions/authActions';
import { getOrders } from './app/actions/orderActions';
import { getCurrentLocation } from './app/actions/userActions';

const AppContainer = createAppContainer(AppSwitch);

export default function App() {
  const uniqueId = getUniqueId();
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };
  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // Alert.alert(fcmToken);
      store.dispatch(getDeviceInfo(fcmToken, uniqueId));
      console.log(fcmToken);
      // const deviceUuid = DeviceInfo.getUniqueId();
      // await DeviceService.addOrUpdateDevice(fcmToken, Platform.OS, deviceUuid);
    } else {
      console.log('No token received');
    }
  };
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      console.log(error);
    }
  };

  const createNotificationListeners = async () => {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('test-channel').setSound('default');
      firebase.notifications().displayNotification(notification);
    });
  };

  const messageListener = async () => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    const notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body, data } = notification;
        const newNoti = {
          title: data.title,
          order: {
            _id: data.orderId,
          },
          _id: data._id,
          createdAt: data.createdAt,
          hasRead: data.hasRead,
        };
        console.log(data);
        store.dispatch(getOrders(data.restaurant));
        // Alert.alert(title);
      });
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body, data } = notificationOpen.notification;
        const newNoti = {
          title: data.title,
          order: {
            _id: data.orderId,
          },
          _id: data._id,
          createdAt: data.createdAt,
          hasRead: data.hasRead,
        };
        store.dispatch(getOrders(data.restaurant));
      });
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      // if(data.screen === 'order'){
      // console.log(data);
      // }
    }
    /*
     * Triggered for data only payload in foreground
     * */
    firebase.messaging().onMessage(message => {
      console.log('FCM Message Data: ', message.data);
    });
  };
  useEffect(() => {
    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'test channel',
      firebase.notifications.Android.Importance.Max,
    );
    firebase.notifications().android.createChannel(channel);
    checkPermission();
    messageListener();
    createNotificationListeners();
    Geolocation.getCurrentPosition(
      position => {
        store.dispatch(
          getCurrentLocation(
            position.coords.latitude,
            position.coords.longitude,
          ),
        );
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer
          ref={navigatorRef => {
            setTopLevelNavigator(navigatorRef);
          }}
        />
      </PersistGate>
    </Provider>
  );
}
