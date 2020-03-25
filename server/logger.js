import winston from 'winston';

const LOGS_FILE = 'logs/server.log';

winston.configure({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      level: 'info',
      handleExceptions: true,
      format: winston.format.json(),
      filename: LOGS_FILE
    })
  ]
});
const logging = process.env.NODE_ENV === 'production' ?
  winston.createLogger({
    transports: [
      new (winston.transports.Console)({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          winston.format.colorize()
        ),
        level: 'debug',
        handleExceptions: true
      }),
      new (winston.transports.File)({
        name: 'infoFile',
        filename: process.env.LOGGER_INFO_PATH,
        level: process.env.LOGGER_INFO_LEVEL,
        prettyPrint: false,
        json: true,
        colorize: false,
        maxsize: process.env.LOGGER_FILE_MAX_SIZE,
        maxFiles: process.env.LOGGER_MAX_FILES
      }),
      new (winston.transports.File)({
        name: 'errorFile',
        filename: process.env.LOGGER_ERROR_PATH,
        level: process.env.LOGGER_ERROR_LEVEL,
        prettyPrint: false,
        json: true,
        colorize: false,
        maxsize: process.env.LOGGER_FILE_MAX_SIZE,
        maxFiles: process.env.LOGGER_MAX_FILES
      })
    ],
    exitOnError: true
  }) :
  winston.createLogger({
    exitOnError: false,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple()
    ),
    level: 'debug',
    transports: [new winston.transports.Console(), new winston.transports.Http()]
  });

export default logging;
