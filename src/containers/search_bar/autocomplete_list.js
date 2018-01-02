// TODO: map state to props , display suggestion
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AutoCompleteListItem from './autocomplete_list_item';

class AutoCompleteList extends Component {
  consturctor(props) {
    this.super(props);
    this.state = { suggestions: [] };
  }

  render() {
    if(!this.props.suggestions) {
      return <div> loading </div>;
    }

    const SearchSuggestionsJSX = this.props.suggestions.map((elm, idx) => {
      return (
        <div key={ idx }>
          <AutoCompleteListItem
            city={ elm }
          />
        </div>
      );
    });

    return (
      <div>
        { SearchSuggestionsJSX }
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
