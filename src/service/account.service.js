const axiosWebApp = require('./axios.service');

const accountAPI = {
  // Show Information
  showInformation: (token) => {
    const url = `/api/user/meinfo`;
    return axiosWebApp.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Logout
  logoutAccount: () => {
    const url = `/api/user/logout`;
    return axiosWebApp.post(url);
  },

  // Change Password
  changePassword: (params = null) => {
    const url = `/api/user/changepassword`;
    return axiosWebApp.put(url, params, {
      withCredentials: true,
    });
  },

  // Logout all
  logoutAccountAll: () => {
    const url = `/api/user/logoutall`;
    return axiosWebApp.post(url);
  },
};

module.exports = accountAPI;
