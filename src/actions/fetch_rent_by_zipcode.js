import axios from 'axios';

const FETCH_RENT_BY_ZIPCODE = 'FETCH_RENT_BY_ZIPCODE';
const ROOT_URL = 'http://localhost:3000/articles-post';

export const fetchRentByZipcode = (zipCode) => {
  const fetchRequest = axios.post(ROOT_URL, {
     zipCodes: [zipCode],
     isPerso: 1,
     isPro: 1,
     isMaison: true,
     isAppart: true,
   });

  return {
    type: FETCH_RENT_BY_ZIPCODE,
    payload: fetchRequest,
  };
};
