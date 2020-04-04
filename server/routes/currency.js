import { getCurrencies } from '../services/currencies';

const getAllCurrencies = async(req, res, next) => {
  try {
    return res.status(200).json(await getCurrencies(req));
  } catch (e) {
    return next(e);
  }
};

export default (router) => {
  router.get('/currency', getAllCurrencies);
};
