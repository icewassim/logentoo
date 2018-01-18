import axios from 'axios';
import actionsConfig from '../config/actions.conf.js';

const ROOT_URL = 'http://localhost:3000/articles-post';

export const fetchRentCreator = (searchParams) => {
  let zipCodes = [];
  if (searchParams.cities && searchParams.cities.length > 0) {
    zipCodes = searchParams.cities.map(city => {
      return city.zipCode;
    });
  }

  const fetchRequest = axios.post(ROOT_URL, {
     zipCodes,
     isPerso: searchParams.isPerso,
     isPro: searchParams.isPro,
     isMaison: searchParams.isMaison,
     isAppart: searchParams.isAppart,
     // TODO: nbr pieces
     price: {
       upper: parseInt(searchParams.maxPrice),
       lower: 0,
     },
   });

  return {
    type: actionsConfig.FETCH_RENT_BY_ZIPCODE,
    payload: fetchRequest,
  };
};
