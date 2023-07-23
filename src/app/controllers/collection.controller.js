const collectionsService = require('../../service/collection.service');

class collectionController {
  async upload(req, res, next) {}

  async uploadMany(req, res, next) {}

  async public(req, res, next) {
    const { l, p } = req.query;
    const query = { params: { limit: !l ? 15 : parseInt(l), page: !p ? 1 : parseInt(p) } };

    await collectionsService
      .getListCollection(req.token, query)
      .then((data) => {
        const { total, result } = data.data.data;

        let arrNum = new Array;
        const numberP = Math.ceil(total / query.params.limit);
        for(let i=0; i<numberP; i++) arrNum.push(i);

        res.render('collections', {
          author: req.user,
          arrNum,
          total,
          collection: result,
        });
      })
      .catch((error) => {
        if (error) {
          res.render('collections', { collection: [] });
        }
      });
  }
}

module.exports = new collectionController();
