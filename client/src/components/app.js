import React from 'react';

import SearchBar from '../containers/search_bar/index';
import RentsList from '../containers/rents_list/index';
import SearchSettings from '../containers/search_form/index';
import SortSettings from '../containers/sort_settings/index';

export const App = () => {
  return (
    <div>
      <div className='logentoo-header'>
        <img className='logentoo-logo' src='/client/assets/images/logento.png' />
        logentoo
      </div>

      <div className="app-container">
        <div className="side-bar">
          <div className="search-card">
            <div className="card-label">
              Vos Lieux
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
              Trier par
              <SortSettings />
              <i className="fa fa-sort-amount-asc"></i>
            </span>
          </div>
          <RentsList />
        </div>

      </div>
    </div>
  );
};
