const express = require('express');
const route = express.Router();

const authController = require('../app/controllers/auth.controller');
const authUser = require('../middleware/auth.middleware');

route.get('/', authController.homePage);

route.get('/login', authController.loginRender);
route.post('/login', authController.login);

module.exports = route;
