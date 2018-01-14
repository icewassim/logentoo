import React, { Component } from 'react';

export default class CitiesList extends Component{
  constructor(props){
    super(props);
  }

  render() {
    if(!this.props.cities) {
      return <span></span>;
    }

    const JSXCitiesList = this.props.cities.map((city, idx) => {
      return (
        <div key={idx} className="rent-tag red-tag">
         {city.name}
         <i className="fa fa-close remove-city" ></i>
        </div>
      );
    })

    return <span>{JSXCitiesList}</span>;
  }
}
