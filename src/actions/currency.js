import { fetchAllCurrencies as fetchAllCurrenciesApi } from '../api/currency';

export const SET_CURRENCIES = 'SET_CURRENCIES';

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies
});

export const fetchAllCurrencies = () => async(dispatch) => {
  const currencies = await fetchAllCurrenciesApi();

  dispatch(setCurrencies(currencies));

  return currencies;
};
