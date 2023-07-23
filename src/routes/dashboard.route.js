const express = require('express');
const route = express.Router();

const dashboardController = require('../app/controllers/dashboard.controller');
const authUser = require('../middleware/auth.middleware');

route.get('/', authUser, dashboardController.dashboard);
route.get('/logout', authUser, dashboardController.logout);

module.exports = route;
