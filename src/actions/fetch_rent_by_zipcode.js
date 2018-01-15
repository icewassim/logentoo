import axios from 'axios';
import actionsConfig from '../config/actions.conf.js';

const ROOT_URL = 'http://localhost:3000/articles-post';

export const fetchRentCreator = (searchParams) => {
  const fetchRequest = axios.post(ROOT_URL, {
    // TODO: nbr pieces
     zipCodes: searchParams.zipCodes,
     isPerso: searchParams.isPerso,
     isPro: searchParams.isPro,
     isMaison: searchParams.isMaison,
     isAppart: searchParams.isAppart,
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
