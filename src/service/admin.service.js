const axiosWebApp = require('./axios.service');

const adminAPI = {
  // Manager account
  managerAccount: (token, params) => {
    const url = `/api/admin/manager/account`;
    return axiosWebApp.get(url, {
      params: !params ? '' : params.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Manager trash account
  managerTrashAccount: () => {
    const url = `/api/admin/manager/trash`;
    return axiosWebApp.get(url);
  },
};

module.exports = adminAPI;
