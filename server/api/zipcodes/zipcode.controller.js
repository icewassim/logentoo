import * as errors from 'restify-errors';

import { findByTerm } from '../../components/zipcode.component';

export const getZipCodesByTerm = ({ params }, res, next) => {
  if (!params || !params.term) {
    loggerT.error('Invalid request Missing term');
    return next(new errors.MissingParameterError('Missing term'));
  }

  loggerT.info('GetZipCodesByTerm [', params.term,']');
  return findByTerm(params.term).then(docs => {
      res.send(docs.map(doc => {
        return {
          zipCode: doc._id,
          name: doc.zipCode.toLowerCase(),
        };
      }));

      return next();
    })
    .catch(err => {
      loggerT.error('Cannot find Zipcode:', err);
      return next(new errors.RestError(err.errors && err.errors.name && err.errors.name.message));
    })
  ;
};
