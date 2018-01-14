import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchZipCode } from '../../actions/fetch_zipcode';
import AutoCompleteList from './autocomplete_list';
import CitiesList  from '../../components/cities_list';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    let selectedCities = [];
    if (localStorage.getItem('selectedCities')) {
      selectedCities = JSON.parse(localStorage.getItem('selectedCities'));
    }

    this.state = {
      searchTerm: '',
      autocompleCities: [],
      selectedCities,
     };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(evt) {
    const searchTerm = evt.target.value;
    this.setState({ searchTerm });

    if (searchTerm.length > 2) {
      // TODO: actionCreator needs to be accessed from props
      return this.props.fetchZipCode(this.state.searchTerm);
    }
    return;
  }

  selectCity(city) {
    let localSelectedCities = [];
    if (localStorage.getItem('selectedCities')) {
      localSelectedCities = JSON.parse(localStorage.getItem('selectedCities'));
    }

    // TODO: refacto redond, the only source of truth
    // check if already exists
    const doubles = localSelectedCities.filter(localStorageCity => {
      return localStorageCity.zipCode === city.zipCode;
    }).length

    let newState = {
      searchTerm: '',
    }

    if(doubles === 0) {
      localStorage.setItem('selectedCities', JSON.stringify([city, ...localSelectedCities]));
      newState.selectedCities = [city, ...this.state.selectedCities];
    }

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <CitiesList cities={this.state.selectedCities} />
        <div className="search-input-wrapper">
          <i className="fa fa-search search-icon"></i>
          <input
            className="search-card-input"
            placeholder='Ville, Code Postale'
            onChange={this.onSearchChange}
            value={this.state.searchTerm}
          />
        </div>
        <AutoCompleteList
          selectCity={this.selectCity.bind(this)}
        />
        <br />
      </div>
    )
  }
}

// TODO: review diagram , role of dispatch and actop creatpr
// TODO: understand are we binding actions, or props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchZipCode }, dispatch);
}

// TODO: why null
export default connect(null, mapDispatchToProps)(SearchBar);
