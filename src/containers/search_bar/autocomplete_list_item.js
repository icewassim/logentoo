import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchRentCreator } from '../../actions/fetch_rent_by_zipcode';

class AutoCompleteListItem extends Component {
  consturctor(props) {
    this.super(props);
  }

  updateParamsWithZipCode(zipCode) {
    if (!localStorage.getItem('searchParams')) {
        localStorage.setItem('searchParams', { zipCodes: [zipCode] });
        return {
          zipCodes: [zipCode],
        };
    }

    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
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
    return this.props.fetchRentCreator(searchParams);
  }

  render() {
    return (
      <div onClick={this.onSelectCity.bind(this)}>
        {this.props.city.name}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchRentCreator}, dispatch);
};

export default connect(null, mapDispatchToProps)(AutoCompleteListItem);
