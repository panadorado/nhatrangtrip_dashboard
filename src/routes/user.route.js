const express = require('express');
const route = express.Router();

const userController = require('../app/controllers/user.controller');
const authUser = require('../middleware/auth.middleware');

route.get('/', authUser, userController.users);

module.exports = route;
