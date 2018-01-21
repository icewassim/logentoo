import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchRentCreator } from '../../actions/fetch_rent';
import { fetchZipCode } from '../../actions/fetch_zipcode';
import AutoCompleteList from '../../components/search_bar/autocomplete_list';
import CitiesList  from '../../components/search_bar/cities_list';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    let selectedCities = [];
    if (localStorage.getItem('searchParams')) {
      selectedCities = JSON.parse(localStorage.getItem('searchParams')).cities || [];
    }

    this.state = {
      searchTerm: '',
      selectedCities,
     };

    this.keyDownTimeout = 0;
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(evt) {
    const searchTerm = evt.target.value;
    this.setState({ searchTerm });

    clearTimeout(this.keyDownTimeout);
    this.keyDownTimeout = setTimeout(() => {
      this.props.fetchZipCode(this.state.searchTerm);
    }, 1000);

    // if (searchTerm.length > 2) {
    //   // TODO: why actionCreator needs to be accessed from props
    //   // TODO: because it was connected via mapactionstoprps
    //   return this.props.fetchZipCode(this.state.searchTerm);
    // }
    return;
  }

  selectCity(city) {
    let localSearchParams = {};
    if (localStorage.getItem('searchParams')) {
      localSearchParams = JSON.parse(localStorage.getItem('searchParams'));
    }

    // check if already exists
    let doubles = 0;
    if (localSearchParams.cities && localSearchParams.cities.length > 0) {
       doubles = localSearchParams.cities.filter(localCity => {
        return localCity.zipCode === city.zipCode;
      }).length;
    }

    let newState = {
      searchTerm: '',
    }

    if(doubles === 0) {
      localSearchParams.cities = [city, ...this.state.selectedCities];
      localStorage.setItem('searchParams', JSON.stringify(localSearchParams));
      newState.selectedCities = localSearchParams.cities;
    }

    return Promise.all[
      this.props.fetchRentCreator(localSearchParams),
      this.setState(newState)
    ];
  }

  removeCity(city) {
    let localSearchParams = [];

    if (localStorage.getItem('searchParams')) {
      localSearchParams = JSON.parse(localStorage.getItem('searchParams'));
    }

    if (!localSearchParams.cities || localSearchParams.cities.length === 0) {
      return;
    }

    const filtredCities = localSearchParams.cities.filter(localCity => {
      return localCity.zipCode !== city.zipCode;
    });

    localSearchParams.cities = filtredCities;
    localStorage.setItem('searchParams', JSON.stringify(localSearchParams));

    return Promise.all[
      this.props.fetchRentCreator(localSearchParams),
      this.setState({
        selectedCities: filtredCities,
      })
    ]
  }

  render() {
    return (
      <div>
        <CitiesList
          cities={this.state.selectedCities}
          removeCity={this.removeCity.bind(this)}
        />
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
          suggestions={this.props.suggestions}
        />
        <br />
      </div>
    )
  }
}

// TODO: review diagram , role of dispatch and actop creatpr
// TODO: understand are we binding actions, or props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchZipCode, fetchRentCreator }, dispatch);
}

const mapStateToProps = state => {
  return {
    suggestions: state.autocompleCities,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
