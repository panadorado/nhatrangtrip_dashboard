const express = require('express');
const route = express.Router();

const collectionController = require('../app/controllers/collection.controller');
const authUser = require('../middleware/auth.middleware');

// Lấy và xem các discover
route.get('/', authUser, collectionController.public);

module.exports = route;
