import * as errors from 'restify-errors';

import rentRepo from '../../models/rent.model';
import { findRentByParams } from '../../components/rent.component';

export const getRentList = (req, res, next) => {
  return rentRepo.find({})
    .then(docs => {
      res.send(docs);
      return next(docs);
    })
    .catch(err => {
      loggerT.error(err);
      return next(new errors.RestError(err.errors.name.message));
    })
  ;
};

export const getRentById = ({ params }, res, next) => {
  if (!params || !params.Id) {
    return next(new errors.MissingParameterError('missing Id'));
  }

  return rentRepo.findOne({ _id: params.Id })
    .then(doc => {
      res.send(doc);
      return next(doc);
    })
    .catch(err => {
      res.status(404).send('!not found');
      return next(new errors.RestError(err.errors.name.message));
    })
  ;
};

// TODO: refacto
export const getRentByParams = ({ params }, res, next) => {

  loggerT.info(params);

  if (!params) {
    loggerT.errror('bad request missing params');
    return next(new errors.MissingParameterError('bad request missing params'));
  }

  return findRentByParams(params)
    .then(docs => {
      res.send(docs);
      return next();
    })
    .catch(err => {
      return next(new errors.InvalidContentError(err));
    })
  ;
};
