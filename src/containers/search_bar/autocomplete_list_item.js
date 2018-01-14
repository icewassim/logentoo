import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchRentCreator } from '../../actions/fetch_rent_by_zipcode';

class AutoCompleteListItem extends Component {
  constructor(props) {
    super(props);
  }

  updateParamsWithZipCode(zipCode) {
    if (!localStorage.getItem('searchParams')) {
        localStorage.setItem('searchParams', { zipCodes: [zipCode] });
        return {
          zipCodes: [zipCode],
        };
    }

    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
    if (!searchParams.zipCodes) {
      searchParams.zipCodes = [];
    }

    if (searchParams.zipCodes.indexOf(zipCode) === -1) {
      searchParams.zipCodes.push(zipCode);
    }

    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    return searchParams;
  }

  onSelectCity() {
    if (!this.props || !this.props.city) {
      return;
    }

    const searchParams = this.updateParamsWithZipCode(this.props.city.zipCode);
    this.props.selectCity(this.props.city);
    return this.props.fetchRentCreator(searchParams);
  }

  render() {
    return (
        <div
            className="auto-complete-list-item"
            onClick={this.onSelectCity.bind(this)}
          >
          {this.props.city.name} ({this.props.city.zipCode})
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchRentCreator }, dispatch);
};

export default connect(null, mapDispatchToProps)(AutoCompleteListItem);
