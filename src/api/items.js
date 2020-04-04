import { sdkRequest } from './utils';

const ITEMS = 'items';

export const getItems = (searchTerm) => (
  sdkRequest(
    ITEMS,
    {
      q: searchTerm
    }
  )
);

export const getItem = (itemId) => (
  sdkRequest(
    `${ITEMS}/${itemId}`
  )
);
