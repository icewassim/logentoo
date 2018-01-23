import React, { Component } from 'react';

export default class Checkbox extends Component {
  constructor(props) {
    // TODO: when to do it ?
    super(props);
  }

  render() {
    return (
      <label className='control control--checkbox'>
        {this.props.label}
        <input
          name={this.props.name}
          checked={this.props.checked}
          onChange={this.props.handleInputChange}
          type="checkbox"
        />
        <span className="control__indicator"></span>
      </label>
    );
  }
}
