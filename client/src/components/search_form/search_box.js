import React, { Component } from 'react';

export default class SearchBox extends Component {
  render() {
    let className = 'checkbox-card-container';

    if(this.props.isLinear) {
      className += ' linear';
    }

    return(
      <div className="search-card">
        <div className="card-label">
          {this.props.label}
        </div>
        <div className={className}>
          {this.props.JSXContent}
        </div>
      </div>
    );
  }
}
