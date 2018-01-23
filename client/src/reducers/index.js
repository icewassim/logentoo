// TODO: why for ?
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { zipCodeReducer } from './zip_code_reducer';
import { rentQueryReducer } from './rent_query_reducer';

const rootReducer = combineReducers({
  autocompleCities: zipCodeReducer,
  rentQueryResult: rentQueryReducer,
  form: formReducer,
});

export default rootReducer;
