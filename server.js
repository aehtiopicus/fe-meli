import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import winston from 'winston';
import { errorLogger, logger }  from 'express-winston';
import dotenv from 'dotenv';
import cors  from 'cors';
import compression  from 'compression';
import apiRouter from './server/routes';
import { handle } from './server/error-handler';
import logging from './server/logger';

dotenv.config();
const STATIC_OPTIONS = {
  maxAge: 31536000000 // One year
};

const app = express();

app.set('trust proxy', 1);
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(express.static(path.join(__dirname, 'build'), STATIC_OPTIONS));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(logger({
  winstonInstance: logging,
  expressFormat: true,
  colorize: false,
  meta: false,
  statusLevels: true
}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

handle(app);

app.use(errorLogger({
  winstonInstance: logging
}));

const server = app.listen(process.env.PORT, () => {
  const serverAddress = server.address();
  winston.info(
    `API running at http://localhost:${serverAddress.port}`
  );
});
