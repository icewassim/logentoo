import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from '../containers/search_bar/index';
import RentList from '../containers/rent_list/index';
import SearchSettings from '../containers/search_form/index';

export const App = () => {
  return (
    <div>
      <div className='logentoo-header'>
        <img className='logentoo-logo' src='/assets/images/logento.png' />
        logentoo
      </div>

      <div className="app-container">
        <div className="side-bar">
          <div className="search-card">
            <div className="card-label">
              Vos Lieux:
            </div>
            <SearchBar/>
          </div>

          <SearchSettings />
        </div>

        <div className="search-result">
          <div className="resultat-header">
            <span className="left-header">
              resultats
            </span>
            <span className="right-header">
              Trier
              <i className="fa fa-sort-amount-asc"></i>
            </span>
          </div>
          <RentList />
        </div>

      </div>
    </div>
  );
};
