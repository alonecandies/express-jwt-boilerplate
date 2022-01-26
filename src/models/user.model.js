'use strict';
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
const { paginate } = require('../plugins/index');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Role, {
        foreignKey: 'userId',
        as: 'role',
      });
    }
  }
  User.init(
    {
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      roleId: { type: DataTypes.INTEGER, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false, unique: true },
      verifyToken: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeSave(async (user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  User.prototype.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

  User.prototype.paginate = paginate(filter, options);

  return User;
};
