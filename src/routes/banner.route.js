const express = require('express');
const route = express.Router();

const bannerController = require('../app/controllers/banner.controller');
const authUser = require('../middleware/auth.middleware');

route.get('/', authUser, bannerController.public);

module.exports = route;
