import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import fetchRentCreator from '../../actions/fetch_rent';

class SortSettings extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('searchParams')) {
      this.state = { sortBy: 'price' };
    } else {
      const sortBy = JSON.parse(localStorage.getItem('searchParams')).sort || 'date';
      this.state = { sortBy: sortBy.name };
    }
  }

  handlSelectChange(evt) {
    this.setState({ sortBy: evt.target.value });
    if (!localStorage.getItem('searchParams')) {
      return;
    }

    let localSearchSettings = JSON.parse(localStorage.getItem('searchParams'));
    localSearchSettings.sort = {
      name: evt.target.value,
      type: evt.target.value === 'date' ? -1 : 1,
    }

    localStorage.setItem('searchParams', JSON.stringify(localSearchSettings))
    this.props.fetchRentCreator(localSearchSettings);
  }

  render() {
    return (
      <select className="select" value={this.state.sortBy} onChange={this.handlSelectChange.bind(this)}>
        <option value="price">Prix</option>
        <option value="date">Date</option>
        <option value="surface">Surface</option>
      </select>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchRentCreator }, dispatch);
}

export default connect(null, mapDispatchToProps)(SortSettings);
