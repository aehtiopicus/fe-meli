import isEmpty from 'lodash/isEmpty';

import { CATEGORY_ID } from './constants';

export const transformApiItemToResponseFormat = ({
  id,
  title,
  price,
  currency_id: currency,
  condition,
  thumbnail: picture,
  shipping: {
    free_shipping
  } = { free_shipping: false },
  seller: {
    id: sellerId
  } = {},
  seller_id,
  pictures
}) => ({
  id,
  title,
  price: {
    currency,
    amount: price,
    decimals: parseFloat(parseFloat(price % 1).toFixed(2))
  },
  picture: !isEmpty(pictures) ? pictures[0].url : picture,
  condition,
  free_shipping,
  sellerId: seller_id || sellerId
});

const getCategories = (filters) => (
  (filters.find(
    ({ id }) => id === CATEGORY_ID
  ) ||
  { values: [] }).values.map(({ name }) => name)
);

export const transformApiSearchToResponseFormat = ({
  results,
  available_filters = []
} = {}) => (
  isEmpty(results) ?
    {} :
    {
      items: results.map(transformApiItemToResponseFormat),
      categories: getCategories(available_filters)
    }
);
