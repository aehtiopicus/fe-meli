import rp from 'request-promise';
import { formatUrl } from 'url-lib';
import {
  MELI_BASE_API,
  MELI_SEARCH_API,
  MELI_ITEM_API
} from './constants';

export const getItems = (q, limit = 4) => (
  rp(
    {
      uri: formatUrl(
        `${MELI_BASE_API}${MELI_SEARCH_API}`,
        {
          q,
          limit
        }
      ),
      json: true
    }
  )
);

export const getItem = (id) => (
  rp(
    {
      uri: `${MELI_BASE_API}${MELI_ITEM_API}${id}`,
      json: true
    }
  )
);

export const getItemDescription = (id) => (
  rp(
    {
      uri: `${MELI_BASE_API}${MELI_ITEM_API}${id}/description`,
      json: true
    }
  )
);
