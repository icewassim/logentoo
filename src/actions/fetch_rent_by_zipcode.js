import axios from 'axios';

const FETCH_RENT_BY_ZIPCODE = 'FETCH_RENT_BY_ZIPCODE';
const ROOT_URL = 'http://localhost:3000/articles-post';

export const fetchRentCreator = (searchParams) => {
  console.log(searchParams);
  const fetchRequest = axios.post(ROOT_URL, {
     zipCodes: searchParams.zipCodes,
     isPerso: 1,
     isPro: 1,
     isMaison: true,
     isAppart: true,
     price: {
       lower: parseInt(searchParams.minPrice),
       upper: parseInt(searchParams.maxPrice),
     },
   });

  return {
    type: FETCH_RENT_BY_ZIPCODE,
    payload: fetchRequest,
  };
};
