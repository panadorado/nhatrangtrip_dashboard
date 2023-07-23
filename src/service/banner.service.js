const axiosWebApp = require('./axios.service');

const bannerAPI = {
  // GET Method - List Banner Filt Category
  getListBannerFiltCategory: (params) => {
    const url = `/api/banner/`;
    return axiosWebApp.get(url, params, {
      withCredentials: true,
    });
  },
};

module.exports = bannerAPI;
