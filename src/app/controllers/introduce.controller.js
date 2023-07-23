const introducesService = require('../../service/introduce.service');

class introduceController {
  async create(req, res, next) {
    res.render('toolIntroduce/insert', { author: req.user });
  }

  async insert(req, res, next) {
    const {
      address,
      category,
      title,
      timeWork,
      priceBuyFrom,
      priceBuyTo,
      description,
      wifi,
      fans,
      groups,
      ship,
      fparking,
      image,
      author,
      enableOther,
      hashtag,
      latitude,
      longitude,
    } = req.body;

    await introducesService
      .postInsertIntroduce(
        {
          address,
          category,
          title,
          timeWork,
          priceBuyFrom,
          priceBuyTo,
          description,
          wifi: Boolean(wifi),
          fans: Boolean(fans),
          groups: Boolean(groups),
          ship: Boolean(ship),
          fparking: Boolean(fparking),
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
        res.redirect('/introduce');
      })
      .catch((error) => {
        if (error) {
          res.render('toolIntroduce/insert', { author: req.user });
        }
      });
  }

  async update(req, res, next) {
    await introducesService
      .getDetailIntro(req.params.slug)
      .then((data) => {
        const introduce = data.data.data;
        res.render('toolIntroduce/update', { author: req.user, introduce });
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
      wifi,
      fans,
      groups,
      ship,
      fparking,
      image,
      author,
      enableOther,
      hashtag,
      latitude,
      longitude,
    } = req.body;

    await introducesService
      .putUpdateIntroduce(
        {
          _id,
          user_id,
          address,
          timeWork,
          priceBuyFrom,
          priceBuyTo,
          description,
          wifi: Boolean(wifi),
          fans: Boolean(fans),
          groups: Boolean(groups),
          ship: Boolean(ship),
          fparking: Boolean(fparking),
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
        res.redirect('/introduce');
      })
      .catch((error) => {
        let msgError = '';
        let jsonError = { statusText: 500, data: { message: 'Lỗi kết nối !' } };

        if (error.response) {
          jsonError = error.response.data;
          msgError = jsonError['data'].message;
        }

        res.render('toolIntroduce/update', {
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
    const query = {
      params: { _limit: !l ? 10 : parseInt(l), _page: !p ? 1 : parseInt(p) },
    };

    await introducesService
      .getListIntro(query)
      .then((data) => {
        const { total, result } = data.data.data;

        let arrNum = new Array;
        const numberP = Math.ceil(total / query.params._limit);
        for(let i=0; i<numberP; i++) arrNum.push(i);

        res.render('introduces', {
          author: req.user,
          arrNum,
          total,
          introduce: result,
        });
      })
      .catch((error) => {
        if (error) {
          res.render('introduces', { introduce: [] });
        }
      });
  }
}

module.exports = new introduceController();
