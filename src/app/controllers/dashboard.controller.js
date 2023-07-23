const introducesService = require('../../service/introduce.service');
const checkinsService = require('../../service/checkin.service');
const bannersService = require('../../service/banner.service');
const eventsService = require('../../service/event.service');
const usersService = require('../../service/admin.service');

class dashboardController {
  async dashboard(req, res, next) {
    const query = { params: { _limit: 5 } };
    const c_introduces = await introducesService.getListIntro(query);
    const c_checkins = await checkinsService.getListChecking(query);
    const c_banners = await bannersService.getListBannerFiltCategory(query);
    const c_events = await eventsService.getListEvent(query);
    const c_users = await usersService.managerAccount(req.token, query);

    res.render('dashboard', {
      author: req.user,
      data: [
        {
          url: '/introduce',
          name: 'introduces',
          view: c_introduces.data.data['total'],
        },
        {
          url: '/checkin',
          name: 'checkins',
          view: c_checkins.data.data['total'],
        },
        {
          url: '/banner',
          name: 'banners',
          view: c_banners.data.data ? c_banners.data.data.length : 0,
        },
        {
          url: '/event',
          name: 'events',
          view: c_events.data.data['result'].length,
        },
        {
          url: '/user',
          name: 'user',
          view: c_users.data.data['total'],
        },
      ],
      newIntroduce: c_introduces.data.data['result'],
      newUserRegister: c_users.data.data['result'],
    });
  }

  logout(req, res, next) {
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  }
}

module.exports = new dashboardController();
