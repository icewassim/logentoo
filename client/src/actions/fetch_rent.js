import axios from 'axios';

import { fetchRentConf } from '../config/actions.conf';

const fetchRentCreator = (searchParams) => {
  let zipCodes = [];
  if (searchParams.cities && searchParams.cities.length > 0) {
    zipCodes = searchParams.cities.map(city => city.zipCode);
  }

  const rooms = [];
  for (let i = 0; i < 6; i++) {
    if (searchParams[`F${i}`]) {
      rooms.push(i + 1);
    }
  }

  const fetchRequest = axios.post(fetchRentConf.ROOT_URL, {
    zipCodes,
    rooms,
    // TODO: fix the crowler
    isPerso: searchParams.isPerso + 0,
    isPro: searchParams.isPro + 0,
    isMaison: searchParams.isMaison,
    isStudio: searchParams.isStudio,
    isAppart: searchParams.isAppart,
    sort: searchParams.sort,
    minSurface: parseInt(searchParams.minSurface, 10),
    price: {
      upper: parseInt(searchParams.maxPrice, 10),
      lower: 0,
    },
  });

  return {
    type: fetchRentConf.TYPE,
    payload: fetchRequest,
  };
};

export default fetchRentCreator;
