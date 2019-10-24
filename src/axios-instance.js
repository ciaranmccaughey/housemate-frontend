import axios from 'axios';

// const API_URL = 'https://www.housem8.app/api/';
const API_URL = 'http://housem8.local/api/';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
      contentType: 'application/json',
      accept: 'application/json'
    }
  
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('tokenhousem8');
    if (token) {
      config.headers.token = token;
    }

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   });

export default instance;