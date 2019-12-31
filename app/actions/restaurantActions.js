/* eslint-disable import/prefer-default-export */
import * as restaurantTypes from '../constants/restaurantTypes';

export const fetchingRestaurant = (restId = null) => {
  return {
    type: restaurantTypes.FETCHING_RESTAURANT,
    payload: {
      restId,
    },
  };
};

export const fetchingMenu = restId => {
  return {
    type: restaurantTypes.FETCHING_MENU,
    payload: {
      restId,
    },
  };
};

export const updateFood = (foodId, updateValue, dishType) => {
  return {
    type: restaurantTypes.UPDATE_FOOD,
    payload: {
      foodId,
      updateValue,
      dishType,
    },
  };
};

export const createFood = foodInput => {
  return {
    type: restaurantTypes.CREATE_FOOD,
    payload: {
      foodInput,
    },
  };
};

export const createDishType = dishTypeInput => {
  return {
    type: restaurantTypes.CREATE_DISH_TYPE,
    payload: {
      dishTypeInput,
    },
  };
};
