import { fetchZipCodeConf, fetchRentConf } from '../config/actions.conf';

export const zipCodeReducer = (state = [], action) => {
  switch (action.type) {
    case fetchZipCodeConf.TYPE:
      return action.payload.data || [];
    case fetchRentConf.TYPE:
      return [];
    default:
  }

  return state;
}
