import { getZipCodesByTerm } from './zipcode.controller';

export const routeZipCodesAPI = server => {
  server.get('/zipcode/:term', getZipCodesByTerm);
}
