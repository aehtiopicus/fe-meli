import isEmpty from 'lodash/isEmpty';

import {
  getItems as getItemsApi,
  getItem as getItemApi
} from '../api/items';
import { fetchAllCurrencies } from './currency';
import { setCurrencySymbol } from '../transformations/items';

const getCurrency = () => (dispatch, getState) => {
  const {
    currency
  } = getState();

  return isEmpty(currency) ? dispatch(fetchAllCurrencies()) : currency;
};


export const getItems = (searchParam) => async(dispatch) => {
  const {
    categories,
    items
  } = await getItemsApi(searchParam);
  
  return {
    categories,
    items: setCurrencySymbol(items, await dispatch(getCurrency()))
  };
};

export const getItem = (itemId) => async(dispatch) => {
  const {
    categories,
    item
  } = await getItemApi(itemId);

  return {
    categories,
    item: setCurrencySymbol(
      [item], await dispatch(getCurrency())
    )[0]
  };
};
