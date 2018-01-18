import React, { Component } from 'react';

export default class CitiesList extends Component{
  constructor(props){
    super(props);
  }

  handleClick(city) {
    this.props.removeCity(city);
  }

  render() {
    if(!this.props.cities) {
      return <span></span>;
    }

    const JSXCitiesList = this.props.cities.map((city, idx) => {
      return (
        <div key={idx} className="rent-tag red-tag" onClick={() => this.handleClick(city)}>
         {city.name}
         <i className="fa fa-close remove-city" ></i>
        </div>
      );
    })

    return <span>{JSXCitiesList}</span>;
  }
}
