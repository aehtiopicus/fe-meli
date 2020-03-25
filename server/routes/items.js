import { getItems, getItem } from '../services/items';

const getAllItems = async(req, res, next) => {
  try {
    return res.status(200).json(await getItems(req));
  } catch (e) {
    return next(e);
  }
};

const getSingleItem = async(req, res, next) => {
  try {
    return res.status(200).json(await getItem(req));
  } catch (e) {
    return next(e);
  }
};

export default (router) => {
  router.get('/items', getAllItems);
  router.get('/items/:id', getSingleItem);
};
