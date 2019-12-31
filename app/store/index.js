/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import reactotron from '../../ReactotronConfig';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    'auth',
    'uiReducer',
    'orderReducer',
    'userReducer',
    'restaurantReducer',
  ],
};

const sagaMonitor = Reactotron.createSagaMonitor();

const pReducer = persistReducer(rootPersistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const store = createStore(
  pReducer,
  compose(applyMiddleware(sagaMiddleware), reactotron.createEnhancer()),
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
