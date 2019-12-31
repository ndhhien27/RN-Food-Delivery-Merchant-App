import { fork } from 'redux-saga/effects';
import restaurantSaga from './restaurantSaga';
// import cartSaga from './cartSaga';
import authSaga from './authSaga';
import orderSaga from './orderSaga';
import userSaga from './userSaga';
import foodSaga from './foodSaga';
import dishTypeSaga from './dishTypeSaga';

// function* demoSaga() {
//   console.log('saga');
// }

function* rootSaga() {
  yield fork(restaurantSaga);
  yield fork(dishTypeSaga);
  yield fork(authSaga);
  yield fork(orderSaga);
  yield fork(userSaga);
  yield fork(foodSaga);
}

export default rootSaga;
