const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger')('error.js');
const ApiError = require('./ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  
  // Convert non-API errors to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  
  // Handle specific errors, if needed
  if (error.message === 'ERR_TOKEN_EXPIRED') {
    return res.status(401).json({ errors: [{ msg: 'invalid access token', code: 'TOKEN_EXPIRED' }], code: 'TOKEN_EXPIRED' });
  }
  
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Determine status code and message
  if (!statusCode) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }

  // Log error
  logger.error('Error while processing HTTP request', err);

  // Send response
  const response = {
    code: statusCode,
    message: message || httpStatus[statusCode],
  };

  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
