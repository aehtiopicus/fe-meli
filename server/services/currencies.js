import { getCurrencies as getCurrenciesApi } from '../api/currencies';

export const getCurrencies = async() => {
  try {
    return getCurrenciesApi();
  } catch (e) {
    const error = new Error('Not able to fetch currencies');
    error.status = e.status || 400;
    error.stack = e.stack;
    throw error;
  }
};
