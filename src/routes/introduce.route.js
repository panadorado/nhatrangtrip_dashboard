const express = require('express');
const route = express.Router();

const introduceController = require('../app/controllers/introduce.controller');
const authUser = require('../middleware/auth.middleware');

// Tạo 1 discover mới
route
  .get('/create', authUser, introduceController.create)
  .post('/create', authUser, introduceController.insert);

route
  .get('/update/:slug', authUser, introduceController.update)
  .put('/update/:slug', authUser, introduceController.edited);

// Lấy và xem các discover
route.get('/', authUser, introduceController.public);

module.exports = route;
