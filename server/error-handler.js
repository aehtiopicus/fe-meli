/* eslint complexity: ["error", 7] */
import Boom from 'boom';

const createError = (status, definedError, additionalData) => {
  const error = {
    message: definedError.message,
    status,
    internalCode: definedError.code,
    info: additionalData ? additionalData.toString() : null,
    handled: true
  };
  if (process.env.NODE_ENV === 'develop') {
    Reflect.deleteProperty(error, 'info');
  }
  if (!error.info) {
    Reflect.deleteProperty(error, 'info');
  }
  return error;
};

const createUnHandleError = (status, definedError, additionalData) => {
  const err = createError(status, definedError);
  if (additionalData) {
    err.info = {
      message: additionalData.message
    };
  }
  Reflect.deleteProperty(err, 'handled');
  return err;
};

const removeCircularReference = (err) => {
  Reflect.deleteProperty(err, 'domain');
  Reflect.deleteProperty(err, 'domainEmitter');
};

const assembleHandledError = (err, res) => {
  Reflect.deleteProperty(err, 'handled');
  return res.status(err.status).json(err);
};

const handleNotFound = (req, res) => res.status(404).json(createUnHandleError(404, 'Not Found'));

const removeOddHeaderIssue = (res) => {
  res.oldWriteHead = res.writeHead;
  res.writeHead = (statusCode, reasonPhrase, headers) => {
    res.header('Content-Type', 'application/json');
    res.header('transfer-encoding', ''); // <— add this line
    res.oldWriteHead(statusCode, reasonPhrase, headers);
  };
};
// TODO: improve following sprints
const handle40xHttpError = (err, res) => {
  if (err.status === 401) {
    return res.status(401).json(
      createUnHandleError(401, 'Unauthorized', err.errors)
    );
  } if (err.status === 403) {
    return res.status(403).json(
      createUnHandleError(403, 'Forbidden', err.errors)
    );
  } if (err.status === 405) {
    return res.status(405).json(
      createUnHandleError(405, 'operationNotAllowed', err.errors)
    );
  }
  // swagger
  const { data, output: { payload }, message } = Boom.badRequest(err.message, err.results ? err.results : err);
  return res.status(400).json({ ...payload, data, message });
};

// eslint-disable-next-line complexity
const handleNonHandledErrors = (err, res) => {
  if (Boom.isBoom(err)) {
    const { errors, output: { payload }, message } = err;
    return res.status(err.output.statusCode).json({ ...payload, message, errors });
  }
  if (err.errors && '???' in err.errors) {
    return res.status(500).json(
      createUnHandleError(500, 'Internal Server Error', err.errors)
    );
  } if (err.message && err.message.indexOf('Unexpected string in JSON') !== -1) {
    return res.status(500).json(
      createUnHandleError(500, 'Internal Server Error', err.errors)
    );
  } if (err.failedValidation || (err.status >= 400 && err.status < 500)) {
    return handle40xHttpError(err, res);
  }
  return res.status(500).json(createUnHandleError(500, 'Unexpected Error', err));
};

const handleErrors = (err, req, res, next) => {
  removeCircularReference(err);
  removeOddHeaderIssue(res);

  if (res.headersSent) {
    return next(err);
  }
  if (err.handled) {
    return assembleHandledError(err, res);
  }
  return handleNonHandledErrors(err, res);
};

const handle = (app) => {
  app.use(handleNotFound);
  app.use(handleErrors);
};

export {
  createError,
  handle,
  handleErrors,
  handleNotFound
};
