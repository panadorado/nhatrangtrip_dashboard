const axiosWebApp = require('../service/axios.service');

const authUser = async (req, res, next) => {
  const authSession = req.session.User;

  if (!authSession) return res.redirect('/login');

  axiosWebApp
    .get('/api/user/meinfo', {
      headers: {
        Authorization: `Bearer ${authSession.uuid}`,
      },
    })
    .then((result) => {
      const data = result.data.data;

      if (data.user.role < 5)
        throw new Error('Tài khoản của bạn không thuộc BQT');

      req.user = {
        avatar: data.user.avatar,
        account: data.user.account,
        name: data.user.name,
      };
      req.token = authSession.uuid;

      next();
    })
    .catch((error) => {
      res.render('signin', {
        error: {
          statusText: !error.statusText ? null : error.statusText,
          message: !error.message ? null : error.message,
        },
      });
    });
};

module.exports = authUser;
