export const zipCodeReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ZIPCODE':
      return action.payload.data;
      break;
    case 'FETCH_RENT_BY_ZIPCODE':
      return [];
    default:
  }


  // TODO: null seriously
  return state;
}
