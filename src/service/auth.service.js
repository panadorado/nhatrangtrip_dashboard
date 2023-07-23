const axiosWebApp = require('./axios.service');

const authAPI = {
  // Login Account
  loginAccount: (params = null) => {
    const url = '/api/auth/login';
    return axiosWebApp.post(url, params, {
      withCredentials: true,
    });
  },
};

module.exports = authAPI;
