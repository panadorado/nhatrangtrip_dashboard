const axiosWebApp = require('./axios.service');

const introduceAPI = {
  // POST Method - Create introduce
  postInsertIntroduce: (params = null, token) => {
    const url = `/api/introduce/create`;
    return axiosWebApp.post(url, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // PUT Method - Update introduce
  putUpdateIntroduce: (params = null, token) => {
    const url = `/api/introduce/update`;
    return axiosWebApp.put(url, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // GET Method - list intro
  getListIntro: (params) => {
    const url = `/api/introduce/`;
    return axiosWebApp.get(url, params);
  },

  // GET Method - detail the intro
  getDetailIntro: (slug = null) => {
    const url = `/api/introduce/${slug}`;
    return axiosWebApp.get(url);
  },

  // GET Method - my list likes the intro
  getLikeListIntro: (limit = null, page = null) => {
    const url = `/api/introduce/mylikes?_page=${page}&_limit=${limit}`;
    return axiosWebApp.get(url);
  },

  // GET Method - my list favorites the intro
  getSaveListIntro: (limit = null, page = null) => {
    const url = `/api/introduce/myfavorites?_page=${page}&_limit=${limit}`;
    return axiosWebApp.get(url);
  },
};

module.exports = introduceAPI;
