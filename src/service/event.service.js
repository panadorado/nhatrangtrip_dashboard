const axiosWebApp = require('./axios.service');

const eventAPI = {
  // GET Method - list Event
  getListEvent: (params) => {
    const url = `/api/event`;
    return axiosWebApp.get(url, params, {
      withCredentials: true,
    });
  },

  // GET Display status event
  getListStatusEvent: () => {
    const url = `/api/event/status`;
    return axiosWebApp.get(url, {
      withCredentials: true,
    });
  },
};

module.exports = eventAPI;
