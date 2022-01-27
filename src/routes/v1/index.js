const express = require('express');
const userRoute = require('./user.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  route.use(route.path, route.route);
});

module.exports = router;
