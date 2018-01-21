import React, { Component } from 'react';

import AutoCompleteListItem from './autocomplete_list_item';

export default class AutoCompleteList extends Component {
  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
  }

  render() {
    if(!this.props.suggestions) {
      return <span></span>;
    }

    const SearchSuggestionsJSX = this.props.suggestions.map(elm => {
      return (
        <div key={elm.zipCode}>
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
