import { fetchRentConf } from '../config/actions.conf';

export const rentQueryReducer = (state = [], action) => {
  switch (action.type) {
    case fetchRentConf.TYPE:
      return action.payload.data || state;
    default:
  }

  return state;
};
