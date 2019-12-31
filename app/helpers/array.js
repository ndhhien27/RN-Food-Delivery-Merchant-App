/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import produce from 'immer';
import _ from 'lodash';

export const findPath = (currentArr, newEl) => {
  const dishTypeIndex = currentArr.findIndex(
    el => el._id === newEl.dishType._id,
  );
  const fLength = currentArr[dishTypeIndex].foods.length;
  return `menu[${dishTypeIndex}].foods[fLength]`;
};
