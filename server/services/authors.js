import { getAuthorDataById as getAuthorDataByIdApi } from '../api/authors';

export const getAuthorDataById = async(userId) => {
  try {
    return getAuthorDataByIdApi(userId);
  } catch (e) {
    const error = new Error('Not able to fetch MELI users');
    error.status = e.status || 400;
    error.stack = e.stack;
    throw error;
  }
};
