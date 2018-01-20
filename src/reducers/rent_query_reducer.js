import { fetchRentConf } from '../config/actions.conf';

export const rentQueryReducer = (state = null, action) => {
  switch (action.type) {
    case fetchRentConf.TYPE:
      return action.payload.data;
    default:
  }

  return state;
}
