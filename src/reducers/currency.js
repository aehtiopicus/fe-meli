import { SET_CURRENCIES } from '../actions/currency';

export const currency = (state = {}, { type, payload }) => {
  let currentState = state;

  if (type === SET_CURRENCIES) {
    currentState = payload;
  }

  return currentState;
};
