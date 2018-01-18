// TODO: map state to props , display suggestion
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AutoCompleteListItem from '../../components/search_bar/autocomplete_list_item';

class AutoCompleteList extends Component {
  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
  }

  render() {
    if(!this.props.suggestions) {
      return <span></span>;
    }

    const SearchSuggestionsJSX = this.props.suggestions.map((elm, idx) => {
      return (
        <div key={idx}>
          <AutoCompleteListItem
            selectCity={this.props.selectCity.bind(this)}
            city={elm}
          />
        </div>
      );
    });

    return (
      <div>
        {SearchSuggestionsJSX}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    suggestions: state.autocompleCities,
  }
};

export default connect(mapStateToProps)(AutoCompleteList);
