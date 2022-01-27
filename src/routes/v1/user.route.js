const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations');
const userController = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('createUser'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('updateUser'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('deleteUser'), validate(userValidation.deleteUser), userController.deleteUser);

router.route('/profile').get(userController.getCurrentUser);

router.route('/allUsers').get(auth('getUsers'), userController.getAllUser);

module.exports = router;
