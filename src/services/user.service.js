const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User, Role, Permission } = require('../models');

const getUserByKey = async (key, value) => {
  return await User.findOne({ where: { [key]: value } });
};

const getAllUsers = async () => {
  return await User.findAll({
    include: [
      {
        model: Role,
        include: [
          {
            model: Permission,
            as: 'permissions',
          },
        ],
      },
    ],
  });
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const createUser = async (userBody) => {
  if (getUserByKey('email', userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email "' + userBody.email + '" is already taken!');
  }

  if (getUserByKey('username', userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username "' + userBody.username + '" is already taken!');
  }

  if (getUserByKey('phone', userBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone "' + userBody.phone + '" is already taken!');
  }

  return User.create(userBody);
};

const updateUserById = async (userId, updateBody) => {
  const user = getUserByKey('id', userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && getUserByKey('email', updateBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (updateBody.phone && getUserByKey('phone', updateBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  Object.assign(user, updateBody);
  return await user.save();
};

const deleteUserById = async (userId) => {
  const user = getUserByKey('id', userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return await user.destroy();
};

module.exports = {
  getUserByKey,
  queryUsers,
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
};
