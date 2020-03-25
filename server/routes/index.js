import express from 'express';

import itemsRoutes from './items';

const apiRouter = express.Router();

itemsRoutes(apiRouter);

export default apiRouter;
