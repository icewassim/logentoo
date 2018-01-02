import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from '../containers/search_bar/index';
import RentList from '../containers/rent_list/index';

export const App = () => {
  return (
    <div>
      <SearchBar />
      <RentList />
    </div>
  );
};
