import rp from 'request-promise';

import {
  MELI_BASE_API,
  MELI_CURRENCY_API
} from './constants';

export const getCurrencies = () => (
  rp(
    {
      uri: `${MELI_BASE_API}${MELI_CURRENCY_API}`,
      json: true
    }
  )
);
