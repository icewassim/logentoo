// TODO: why for ?
import { combineReducers } from 'redux';

import { zipCodeReducer } from './zip_code_reducer';
import { rentQueryReducer } from './rent_query_reducer';

const rootReducer = combineReducers({
  autocompleCities: zipCodeReducer,
  rentQueryResult: rentQueryReducer,
});

export default rootReducer;
