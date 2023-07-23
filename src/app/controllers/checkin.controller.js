const checkinsService = require('../../service/checkin.service');

class checkinsController {
  async insert(req, res, next) {
    res.render('toolCheckin/insert', { author: req.user });
  }

  async create(req, res, next) {
    const {
      address,
      category,
      title,
      timeWork,
      priceBuyFrom,
      priceBuyTo,
      description,
      image,
      author,
      enableOther,
      hashtag,
      latitude,
      longitude,
    } = req.body;

    await checkinsService
      .postInsertChecking(
        {
          address,
          category,
          title,
          timeWork,
          priceBuyFrom,
          priceBuyTo,
          description,
          image,
          author,
          enableOther: Boolean(enableOther),
          hashtag,
          latitude,
          longitude,
        },
        req.token,
      )
      .then(() => {
        res.redirect('/checkin');
      })
      .catch((error) => {
        if (error) {
          res.render('toolCheckin/insert', { author: req.user });
        }
      });
  }

  async update(req, res, next) {
    await checkinsService
      .getDetailChecking(req.params.slug)
      .then((data) => {
        const checkin = data.data.data;
        res.render('toolCheckin/update', { author: req.user, checkin });
      })
      .catch((error) => {
        if (error) {
          next(error.message);
        }
      });
  }

  async edited(req, res, next) {
    const {
      _id,
      user_id,
      address,
      timeWork,
      priceBuyFrom,
      priceBuyTo,
      description,
      image,
      author,
      enableOther,
      hashtag,
      latitude,
      longitude,
    } = req.body;

    await checkinsService
      .putUpdateChecking(
        {
          _id,
          user_id,
          address,
          timeWork,
          priceBuyFrom,
          priceBuyTo,
          description,
          image,
          author,
          enableOther: Boolean(enableOther),
          hashtag,
          latitude,
          longitude,
        },
        req.token,
      )
      .then(() => {
        res.redirect('/checkin');
      })
      .catch((error) => {
        let msgError = '';
        let jsonError = { statusText: 500, data: { message: 'Lỗi kết nối !' } };

        if (error.response) {
          jsonError = error.response.data;
          msgError = jsonError['data'].message;
        }

        res.render('toolCheckin/update', {
          author: req.user,
          error: {
            statusText: jsonError.statusText,
            message: msgError,
          },
        });
      });
  }

  async public(req, res, next) {
    const { l, p } = req.query;
    const query = { params: { _limit: !l ? 10 : l, _page: !p ? 1 : p } };
    await checkinsService
      .getListChecking(query)
      .then((data) => {
        const { total, result } = data.data.data;

        let arrNum = new Array;
        const numberP = Math.ceil(total / query.params._limit);
        for(let i=0; i<numberP; i++) arrNum.push(i);

        res.render('checkins', {
          author: req.user,
          arrNum,
          total,
          checkin: result,
        });
      })
      .catch((error) => {
        if (error) {
          res.render('checkins', { checkin: [] });
        }
      });
  }
}

module.exports = new checkinsController();
