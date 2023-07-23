const axios = require('axios');
const { parse, stringify } = require('qs');

const axiosWebApp = axios.create({
  baseURL: process.env.SERVER_API ?? process.env.SERVER_TEST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': true,
    crossorigin: true,
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

module.exports = axiosWebApp;
