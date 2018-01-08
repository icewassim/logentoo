import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from '../containers/search_bar/index';
import RentList from '../containers/rent_list/index';
import SearchSettings from '../containers/search_settings/index';

export const App = () => {
  return (
    <div>
      <SearchBar />
      <SearchSettings />
      <RentList />
    </div>
  );
};
