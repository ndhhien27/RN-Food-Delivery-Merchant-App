/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import * as restaurantTypes from '../constants/restaurantTypes';

const initialState = {
  restaurantInfo: {},
  fetchingError: null,
  menu: [],
  fetchingMenuError: null,
  updateFoodError: null,
  createFoodError: null,
  createDishTypeError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case restaurantTypes.FETCHING_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurantInfo: payload.restaurantInfo,
      };
    case restaurantTypes.FETCHING_RESTAURANT_ERROR:
      return {
        ...state,
        fetchingError: payload.error,
      };
    case restaurantTypes.FETCHING_MENU_SUCCESS:
      return {
        ...state,
        menu: payload.menu,
      };
    case restaurantTypes.FETCHING_MENU_ERROR:
      return {
        ...state,
        fetchingMenuError: payload.error,
      };
    case restaurantTypes.UPDATE_FOOD_SUCCESS:
      return {
        ...state,
        menu: payload.newMenu,
      };
    case restaurantTypes.UPDATE_FOOD_ERROR:
      return {
        ...state,
        updateFoodError: payload.error,
      };
    case restaurantTypes.CREATE_FOOD_SUCCESS:
      return {
        ...state,
        menu: state.menu.map(el =>
          el._id === payload.newFood.dishType._id
            ? {
                ...el,
                foods: [...el.foods, { ...payload.newFood }],
              }
            : el,
        ),
      };
    case restaurantTypes.CREATE_FOOD_ERROR:
      return {
        ...state,
        createFoodError: payload.error,
      };
    case restaurantTypes.CREATE_DISH_TYPE_SUCCESS:
      return {
        ...state,
        menu: [...state.menu, { ...payload.newDishType }],
        createDishTypeError: null,
      };
    case restaurantTypes.CREATE_DISH_TYPE_ERROR:
      return {
        ...state,
        createDishTypeError: payload.error,
      };
    default:
      return state;
  }
};
