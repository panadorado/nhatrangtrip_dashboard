const bannersService = require('../../service/banner.service');
const { mutipleMongooseToObject } = require('../../utils/mongoose.util');

class bannerController {
  async public(req, res, next) {
    const query = { params: { _limit: 5 } };
    await bannersService
      .getListBannerFiltCategory(query)
      .then((data) => {
        res.render('banners', { author: req.user, banner: data.data.data });
      })
      .catch((error) => {
        if (error) {
          res.render('banners', { checkin: [] });
        }
      });
  }
}

module.exports = new bannerController();
