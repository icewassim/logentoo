import axios from 'axios';

import { fetchRentConf } from '../config/actions.conf.js';

export const fetchRentCreator = (searchParams) => {
  let zipCodes = [];

  if (searchParams.cities && searchParams.cities.length > 0) {
    zipCodes = searchParams.cities.map(city => {
      return city.zipCode;
    });
  }

  const fetchRequest = axios.post(fetchRentConf.ROOT_URL, {
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
    type: fetchRentConf.TYPE,
    payload: fetchRequest,
  };
};
