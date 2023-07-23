const authService = require('../../service/auth.service');

class authController {
  homePage(req, res, next) {
    if (req.session.User) return res.redirect('/dashboard');

    res.render('home');
  }

  loginRender(req, res, next) {
    if (req.session.User) return res.redirect('/dashboard');

    res.render('signin');
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    if (req.session.User) req.session.destroy();

    await authService
      .loginAccount({ email, password })
      .then((result) => {
        const token = result.data.data;
        req.session.User = { uuid: token.accessToken };
        res.redirect('/');
      })
      .catch((error) => {
        let msgError = '';
        let jsonError = {
          statusText: 'Server Error',
          data: { message: 'Lỗi kết nối !' },
        };

        if (error.response) {
          jsonError = error.response.data;

          if (jsonError.data) {
            if (jsonError['data'].message === 'wrong_user_password_!')
              msgError = 'Mật khẩu không hợp lệ.';
            else if (jsonError['data'].message === 'required_account')
              msgError = 'Vui lòng nhập tài khoản.';
            else if (jsonError['data'].message === 'email_is_not_registered_!')
              msgError = 'Tài khoản không tồn tại.';
          }
        } else {
          msgError = jsonError['data'].message;
        }

        res.render('signin', {
          error: {
            statusText: jsonError.statusText,
            message: msgError,
          },
        });
      });
  }
}

module.exports = new authController();
