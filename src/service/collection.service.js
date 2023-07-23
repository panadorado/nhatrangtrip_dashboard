const axiosWebApp = require('./axios.service');

const collectionAPI = {
  // GET Method - list checking
  getListCollection: (token, params) => {
    const url = `/api/collection/photomany`;
    return axiosWebApp.get(url, {
      params: !params ? '' : params.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

module.exports = collectionAPI;
