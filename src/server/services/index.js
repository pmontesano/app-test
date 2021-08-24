const axios = require('axios');

const doRequest = () => (url, params) => {
  return axios.get(url, params);
};

// Fetch data exercise1
const get = (req, url) => () =>
  doRequest(req)(url, {
    responseType: 'json',
  });

const service = (req, url) => {
  console.log('url', url);

  if (!req) {
    // eslint-disable-next-line
    console.warn('services/searches: you must provide a req object');
  }
  return {
    get: get(req, url),
  };
};

const getDataExercice1 = (req) =>
  service(req, 'http://demo0563339.mockable.io/exercise1');

const getDataExercice2 = (req) =>
  service(req, 'http://demo0563339.mockable.io/exercise2');

export { getDataExercice1, getDataExercice2 };
