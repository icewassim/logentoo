import rentRepo from '../models/rent.model';

const ARTICLE_TYPE = {
  STUDIO: 0,
  APPARTEMENT: 1,
  MAISON: 2,
  GARAGE: 3,
  OTHERS: 4,
};

export const findRentByParams = params => {
  const { isPro, isPerso } = params;

  const articleTypes = [];
  params.isStudio && articleTypes.push(ARTICLE_TYPE.STUDIO);
  params.isMaison && articleTypes.push(ARTICLE_TYPE.MAISON);
  params.isAppart && articleTypes.push(ARTICLE_TYPE.APPARTEMENT);
  params.isGarage && articleTypes.push(ARTICLE_TYPE.GARAGE);

  const sortBy = {};
  if (params.sort) {
    sortBy[params.sort.name] = params.sort.type;
  } else {
    sortBy['date'] = -1;
  }

  const query = {
    '$or': [{ 'isPerso': isPerso }, { 'isPro': isPro }],
    'type': { '$in': articleTypes },
  };

  if (params.zipCodes && params.zipCodes.length > 0) {
    query.zipCode = { '$in': params.zipCodes };
  }

  const priceQuery = {};
  if (params.price) {
    params.price.lower && (priceQuery['$gt'] = params.price.lower);
    params.price.upper && (priceQuery['$lt'] = params.price.upper);
    query.price = priceQuery;
  }

  const surfaceQuery = {};
  if (params.minSurface) {
    surfaceQuery['$gt'] = params.minSurface;
    query.surface = surfaceQuery;
  }

  if (params.rooms && params.rooms.length !== 0) {
    query.rooms = { '$in': params.rooms.map(elm => parseInt(elm)) };
  }

  loggerT.info('[getRentByParams] mongoQuery:', query);
  return rentRepo.find(query).sort(sortBy);
};
