import * as uiTypes from '../constants/uiTypes';

const initialState = {
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case uiTypes.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case uiTypes.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
