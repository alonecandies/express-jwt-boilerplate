const { Sequelize } = require('sequelize');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../logger/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  let sequelizeError;
  const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
    dialect: 'mysql',
  });
  sequelize
    .authenticate()
    .then(() => {})
    .catch((err) => (sequelizeError = err));
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof sequelizeError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
