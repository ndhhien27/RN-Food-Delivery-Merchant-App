/* eslint-disable import/no-extraneous-dependencies */
import Reactotron, { asyncStorage } from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';
import { host } from './config';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ host }) // controls connection & communication settings
  .use(sagaPlugin())
  .use(reactotronRedux())
  .use(asyncStorage())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

export default reactotron;
