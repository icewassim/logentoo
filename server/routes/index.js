import { routeZipCodesAPI } from '../api/zipcodes';
import { routeRentAPI } from '../api/rent';

module.exports = function(server) {
  routeZipCodesAPI(server);
  routeRentAPI(server);
}
