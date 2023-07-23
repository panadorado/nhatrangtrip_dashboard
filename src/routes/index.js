const auth = require('./auth.route');
const dashboard = require('./dashboard.route');
const collection = require('./collection.route');
const introducePage = require('./introduce.route');
const checkinPage = require('./checkin.route');
const bannerPage = require('./banner.route');
const userPage = require('./user.route');

function route(app) {
  app.use('/', auth);
  app.use('/dashboard', dashboard);
  app.use('/introduce', introducePage);
  app.use('/collection', collection);
  app.use('/checkin', checkinPage);
  app.use('/banner', bannerPage);
  app.use('/user', userPage);
}

module.exports = route;
