import { getCatergory as getCatergoryApi } from '../api/categories';

export const getCategory = async(categoryId) => {
  try {
    return getCatergoryApi(categoryId);
  } catch (e) {
    const error = new Error('Not able to fetch currencies');
    error.status = e.status || 400;
    error.stack = e.stack;
    throw error;
  }
};
