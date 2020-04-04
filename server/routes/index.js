import express from 'express';

import itemsRoutes from './items';
import currencyRoutes from './currency';

const apiRouter = express.Router();

itemsRoutes(apiRouter);
currencyRoutes(apiRouter);

export default apiRouter;
