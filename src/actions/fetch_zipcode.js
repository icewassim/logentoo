import exios from 'axios';

// TODO:  move to config
const API_ROOT_URL = `http://localhost:3000/zipcode/`;
export const FETCH_ZIPCODE = 'FETCH_ZIPCODE';

export const fetchZipCode = (searchTerm) => {
  const requestApi = exios.get(API_ROOT_URL + searchTerm);
  return {
    type: FETCH_ZIPCODE,
    payload: requestApi,
  }
};
