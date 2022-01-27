const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations');
const roleController = require('../../controllers');

const router = express.Router();

router
   .route('/')
   .post(auth('createRole'),validate(roleValidation.createRole),roleController.createRole)

router
   .route('/:roleId')
   .get(auth('getRoles'),validate(roleValidation.getRole),roleController.getRole)
   .patch(auth('updateRole'),validate(roleValidation.updateRole),roleController.updateRole)
   .delete(auth('deleteRole'),validate(roleValidation.deleteRole),roleController.deleteRole)

router
   .route('/allRoles')
   .get(auth('getRoles'),roleController.getAllRoles)