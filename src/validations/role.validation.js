const Joi = require('joi');

const createRole = {
  body: Joi.object().keys({
    roleName: Joi.string().required(),
    roleDescription: Joi.string(),
  }),
};

const getRole = {
  params: Joi.object().keys({
    roleId: Joi.number().required(),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      roleName: Joi.string().required(),
      roleDescription: Joi.string(),
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.number().required(),
  }),
};

module.exports = {
  createRole,
  getRole,
  updateRole,
  deleteRole,
};
