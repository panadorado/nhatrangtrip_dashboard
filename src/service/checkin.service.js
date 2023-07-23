const axiosWebApp = require('./axios.service');

const checkingAPI = {
  // Insert (Create) new a Post
  postInsertChecking: (params = null, token) => {
    const url = `/api/checking/create`;
    return axiosWebApp.post(url, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // PUT Method - Update introduce
  putUpdateChecking: (params = null, token) => {
    const url = `/api/checking/update`;
    return axiosWebApp.put(url, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // PUT Method - Favorite & unFavorite checking
  putSaveChecking: (_id = null) => {
    const url = `/api/checking/favorite`;
    return axiosWebApp.put(url, _id, {
      withCredentials: true,
    });
  },

  // GET Method - list checking
  getListChecking: (params) => {
    const url = `/api/checking/`;
    return axiosWebApp.get(url, params, {
      withCredentials: true,
    });
  },

  // GET Method - detail the checking
  getDetailChecking: (slug = null) => {
    const url = `/api/checking/${slug}`;
    return axiosWebApp.get(url);
  },
};

module.exports = checkingAPI;
