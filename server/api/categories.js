import rp from 'request-promise';

import {
  MELI_BASE_API,
  MELI_CATEGORY_API
} from './constants';

export const getCatergory = (categoryId) => (
  rp(
    {
      uri: `${MELI_BASE_API}${MELI_CATEGORY_API}${categoryId}`,
      json: true
    }
  )
);
