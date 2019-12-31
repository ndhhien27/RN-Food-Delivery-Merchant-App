/* eslint-disable import/prefer-default-export */
export const currencyFormat = string => {
  return string.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
