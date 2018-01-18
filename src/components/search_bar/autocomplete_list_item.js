import React, { Component } from 'react';

export default class AutoCompleteListItem extends Component {
  constructor(props) {
    super(props);
  }

  onSelectCity() {
    this.props.selectCity(this.props.city);
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
};
