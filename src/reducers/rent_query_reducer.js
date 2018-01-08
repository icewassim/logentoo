export const rentQueryReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_RENT_BY_ZIPCODE':
      return action.payload.data;
    default:
  }

  return state;
}
