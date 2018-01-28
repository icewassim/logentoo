import React, { Component  } from 'react';

import SearchBar from '../containers/search_bar/index';
import { defaultSearchConfig } from '../config/search_form_conf';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { maxPrice: '' };
  }

  handleBudgetCHange(evt) {
    this.setState({ maxPrice: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let searchParams;
    if (!localStorage.getItem('searchParams')) {
      searchParams = JSON.parse(defaultSearchConfig);;
    } else {
      searchParams = JSON.parse(localStorage.getItem('searchParams'));
    }

    searchParams.maxPrice = this.state.maxPrice || 200000;
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    window.location.href = "/search";
  }

  render() {
    return (
      <div>
        <div className="hero-header">
          <div className='logentoo-hero-header'>
            <img className='logentoo-hero-logo' src='/client/assets/images/logento.png' />
            logentoo
          </div>
        </div>
        <br />
        <br />
        <h1 className="hero-title">Boostez votre recherche de logement</h1>
        <div className="search-card center-form">
          <SearchBar/>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              className="search-card-input hero-budget"
              onChange={ this.handleBudgetCHange.bind(this) }
              placeholder="Budget Max"
              value={this.state.maxPrice}
            />
            <input type="submit" className="rent-tag red-tag hero-btn" value="RECHERCHER" />
          </form>
        </div>
        <div className="hero-footer" > Made with a lot of <i className="fa fa-coffee" />by <a href="http://icewassim.com"> Icewassim  </a></div>
        <img src="/client/assets/images/room-wallpaper.jpg" className="hero-wallpaper" />
        <div className="hero-cover"></div>
      </div>
    );
  }
}
