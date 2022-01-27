const passport = require('passport');
const httpStatus = require('http-status');
const { permissionCheck } = require('./permissionCheck');

const auth = (requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (req, res, next) => {
      permissionCheck(req.user.roleId, requiredRights).then((rolePermission) => {
        if (!req.body.roleId || !req.body.email || !req.body.password || !req.body.phone || !req.body.username) {
          res.status(httpStatus[400]).send({ msg: 'Please pass email, password, phone or username!' });
        } else {
          next();
        }
      });
    });
  })
    .then(() => next())
    .catch((error) => {
      res.status(httpStatus.FORBIDDEN).send(error);
    });
};

module.exports = auth;
