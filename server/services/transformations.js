import isEmpty from 'lodash/isEmpty';

import { CATEGORY_ID } from './constants';

const transformToPrettyPicture = (picture) => (
  picture.split('-').map(
    (current, index, ro) => (
      index === ro.length - 1 ?
        current.replace('I.', 'O.') :
        current
    )
  ).join('-')
);

const getCategories = (filters) => (
  (
    filters.find(
      ({ id }) => id === CATEGORY_ID
    ) ||
    { values: [{ path_from_root: [] }] }
  ).values[0].path_from_root.map(({ name: catName }) => catName)
);

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
  pictures,
  address: {
    state_name: address
  } = {}
}) => ({
  id,
  title,
  price: {
    currency,
    amount: parseInt(price, 10),
    decimals: parseFloat(parseFloat(price % 1).toFixed(2))
  },
  picture: transformToPrettyPicture(
    !isEmpty(pictures) ? pictures[0].url : picture
  ),
  condition,
  free_shipping,
  sellerId: seller_id || sellerId,
  address
});

export const transformApiSearchToResponseFormat = ({
  results,
  filters = []
} = {}) => (
  isEmpty(results) ?
    {} :
    {
      items: results.map(transformApiItemToResponseFormat),
      categories: getCategories(filters)
    }
);
