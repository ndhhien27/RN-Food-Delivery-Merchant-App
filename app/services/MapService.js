import axios from 'axios';
import { MAP_KEY, DIRECTION_URL, GEOCODING_URL } from './api_contants';

const geocoding = (address, resCb, errCb) => {
  const params = {
    address,
    key: MAP_KEY,
  };
  return axios({
    method: 'post',
    url: GEOCODING_URL,
    params,
  })
    .then(resCb)
    .catch(errCb);
};

const directions = (origin, destination, resCb, errCb) => {
  const params = {
    origin,
    destination,
    key: MAP_KEY,
  };
  return axios({
    method: 'get',
    url: DIRECTION_URL,
    params,
  })
    .then(resCb)
    .catch(errCb);
};

const geocodeReverse = (lat, long, resCb, errCb) => {
  const params = {
    latlng: `${lat},${long}`,
    key: MAP_KEY,
  };
  return axios({
    method: 'get',
    url: GEOCODING_URL,
    params,
  })
    .then(resCb)
    .catch(errCb);
};

export default {
  directions,
  geocoding,
  geocodeReverse,
};
