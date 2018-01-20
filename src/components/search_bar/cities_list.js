import React, { Component } from 'react';

export default class CitiesList extends Component{
  handleClick(city) {
    this.props.removeCity(city);
  }

  render() {
    if(!this.props.cities) {
      return <span></span>;
    }

    const JSXCitiesList = this.props.cities.map(city => {
      return (
        <div key={city.zipCode} className="rent-tag red-tag" onClick={this.handleClick.bind(this, city)}>
         {city.name}
         <i className="fa fa-close remove-city" ></i>
        </div>
      );
    })

    return <span>{JSXCitiesList}</span>;
  }
}
