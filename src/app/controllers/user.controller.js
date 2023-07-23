const usersService = require('../../service/admin.service');

class introduceController {
  async users(req, res, next) {
    const { l, p } = req.query;
    const query = {
      params: { _limit: !l ? 10 : parseInt(l), _page: !p ? 1 : parseInt(p) },
    }

    await usersService
      .managerAccount(req.token, query)
      .then((data) => {
        const { total, result } = data.data.data;

        let arrNum = new Array;
        const numberP = Math.ceil(total / query.params._limit);
        for(let i=0; i<numberP; i++) arrNum.push(i);

        res.render('users', {
          author: req.user,
          arrNum,
          total,
          user: result,
        });
      })
      .catch((error) => {
        if (error) {
          next(error);
          res.render('users', { user: [] });
        }
      });
  }
}

module.exports = new introduceController();
