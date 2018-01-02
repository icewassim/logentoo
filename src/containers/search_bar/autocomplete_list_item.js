import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchRentByZipcode } from '../../actions/fetch_rent_by_zipcode';

class AutoCompleteListItem extends Component {
  consturctor(props) {
    this.super(props);
    this.state = { city: {} };
  }

  onSelectCity() {
    this.props.fetchRentByZipcode(this.props.city.zipCode);
  }

  render() {
    return (
      <div onClick={ this.onSelectCity.bind(this) }>
        { this.props.city.name }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchRentByZipcode }, dispatch);
};

export default connect(null, mapDispatchToProps)(AutoCompleteListItem);
