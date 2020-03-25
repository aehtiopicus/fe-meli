import isEmpty from 'lodash/isEmpty';

import {
  getItems as getItemsApi,
  getItem as getItemApi,
  getItemDescription as getItemDescriptionApi
} from '../api/items';
import { getAuthorDataById } from './authors';
import {
  transformApiSearchToResponseFormat,
  transformApiItemToResponseFormat
} from './transformations';

export const getItem = async({
  params: {
    id
  } = {}
}) => {
  try {
    if (isEmpty(id)) {
      return {};
    }

    const [item, description] = await Promise.all(
      [
        getItemApi(id),
        getItemDescriptionApi(id)
      ]
    );
    const {
      sellerId,
      ...transformedItem
    } = transformApiItemToResponseFormat(item);
    const {
      nickname
    } = await getAuthorDataById(sellerId);

    return {
      item: {
        ...transformedItem,
        sold_quantity: item.sold_quantity,
        description: !isEmpty(description) ? description.plain_text : ''
      },
      author: {
        nickname
      }
    };
  } catch (e) {
    const error = new Error('Not able to fetch MELI');
    error.status = e.status || 400;
    error.stack = e.stack;
    throw error;
  }
};

export const getItems = async({
  query: {
    q,
    limit
  } = {}
}) => {
  try {
    return isEmpty(q) ?
      {} :
      transformApiSearchToResponseFormat(
        await getItemsApi(q, limit)
      );
  } catch (e) {
    const error = new Error('Not able to fetch MELI');
    error.status = e.status || 400;
    error.stack = e.stack;
    throw error;
  }
};
