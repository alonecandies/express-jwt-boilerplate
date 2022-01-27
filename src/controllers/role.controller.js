const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');

const createRole = catchAsync(async(req,res) => {
   const role = await roleService.createRole(req.body);
   res.status(httpStatus.CREATED).send(role);
})

const getRole = catchAsync(async(req,res)=>{
   const role = await roleService.getRoleByKey('id',req.params.roleId);
   if(!role){
      throw new ApiError(httpStatus.NOT_FOUND,'Role not found!');
   }
   res.send(role);
})

const getAllRoles = catchAsync(async(req,res) => {
   const roles = await roleService.getAllRoles();
   res.send(roles);
});

const updateRole = catchAsync(async(req,res) => {
   const role = await roleService.updateRoleById(req.params.roleId,req.body);
   res.send(role);
})

const deleteRole = catchAsync(async(req,res) => {
   const role = await roleService.deleteRoleById(req.params.roleId);
  res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
   createRole,
   getAllRoles,
   getRole,
   updateRole,
   deleteRole
}
