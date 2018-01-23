import {
  getRentList,
  getRentById,
  getRentByParams,
 } from './rent.controller';

export const routeRentAPI = server => {
  server.post('/rents-list-params', getRentByParams);
  server.get('/rent-list', getRentList);
  server.get('/rent/:Id', getRentById);
};

// TODO: server crash if no route was found
