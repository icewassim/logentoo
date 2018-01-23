import exios from 'axios';

import { fetchZipCodeConf } from '../config/actions.conf';

const fetchZipCode = (searchTerm) => {
  if (!searchTerm || searchTerm === '') {
    return {
      type: fetchZipCodeConf.TYPE,
      payload: [],
    };
  }

  const requestApi = exios.get(fetchZipCodeConf.ROOT_URL + searchTerm);
  return {
    type: fetchZipCodeConf.TYPE,
    payload: requestApi,
  };
};

export default fetchZipCode;
