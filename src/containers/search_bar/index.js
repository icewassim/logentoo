import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchZipCode } from '../../actions/fetch_zipcode';
import AutoCompleteList from './autocomplete_list';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      autocompleCities: [],
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

  resetInputValue() {
    this.setState({ searchTerm: '' });
  }

  render() {
    return (
      <div>
        <input
          placeholder='Code Postal ou Commune'
          onChange={this.onSearchChange}
          value={this.state.searchTerm}
        />
        <AutoCompleteList resetSearchTerm={this.resetInputValue.bind(this)}/>
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
