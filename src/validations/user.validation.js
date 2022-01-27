const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    username: Joi.string().required().min(8).max(30),
    password: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    roleId: Joi.number().required().default(0),
    phone: Joi.string().required().min(7),
    verifyToken: Joi.string().default(null),
    isVerified: Joi.boolean().default(false),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    roleId: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      phone: Joi.string().min(7),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
