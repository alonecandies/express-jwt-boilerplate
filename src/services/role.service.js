const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Role, Permission, User } = require('../models');

const getRoleByKey = async (key, value) => {
  return await Role.findOne(
    { where: { [key]: value } },
    {
      include: {
        model: Permission,
        as: 'permissions',
      },
    }
  );
};

const createRole = async (roleBody) => {
  if (getRoleByKey('roleName', roleBody.roleName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role "' + roleBody.roleName + '"is already taken!');
  }

  return Role.create(roleBody);
};

const getAllRoles = async () => {
  return await Role.findAll({
    include: [
      {
        model: Permission,
        as: 'permissions',
      },
      {
        model: User,
        as: 'users',
      },
    ],
  });
};

const updateRoleById = async (roleId, updateBody) => {
  const role = getRoleByKey('id', roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found!');
  }
  if (updateBody.roleName && getRoleByKey('roleName', updateBody.roleName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role "' + roleBody.roleName + '"is already taken!');
  }
  Object.assign(role, updateBody);
  return await role.save();
};

const deleteRoleById = async (roleId) => {
  const role = getRoleByKey('id', roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found!');
  }
  return await role.destroy();
};

module.exports = {
  getAllRoles,
  getRoleByKey,
  createRole,
  updateRoleById,
  deleteRoleById,
};
