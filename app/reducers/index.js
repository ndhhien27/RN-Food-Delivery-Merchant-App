import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['authToken', 'merchantId'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  uiReducer,
  orderReducer,
  userReducer,
  restaurantReducer,
});

export default rootReducer;
