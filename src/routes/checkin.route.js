const express = require('express');
const route = express.Router();

const checkinController = require('../app/controllers/checkin.controller');
const authUser = require('../middleware/auth.middleware');

route
  .get('/create', authUser, checkinController.insert)
  .post('/create', authUser, checkinController.create);

route
  .get('/update/:slug', authUser, checkinController.update)
  .put('/update/:slug', authUser, checkinController.edited);

route.get('/', authUser, checkinController.public);

module.exports = route;
