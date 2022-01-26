const httpStatus = require('http-status');
const { RolePermission, Permission } = require('../models');
const ApiError = require('../utils/ApiError');

const checkPermission = (roleId, permissionName) => {
  return new Promise((resolve, reject) => {
    Permission.findOne({
      where: {
        permissionName: permissionName,
      },
    })
      .then((permission) => {
        RolePermission.findOne({
          where: {
            roleId: roleId,
            permissionId: permission.id,
          },
        })
          .then((rolePermission) => {
            if (rolePermission) {
              resolve(rolePermission);
            } else {
              reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden!'));
            }
          })
          .catch((error) => {
            reject(new ApiError(httpStatus.BAD_REQUEST));
          });
      })
      .catch(() => {
        reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden!'));
      });
  });
};

module.exports = checkPermission;
