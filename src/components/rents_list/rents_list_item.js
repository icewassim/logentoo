import React, { Component } from 'react';

export class RentsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { visited: true };
  }

  selectCity(name, zipCode) {
    // TODO: extract select city from searchbar index to an action actionCreator
    // and call it here
  }

  render() {
    const itemProps = this.props.item;
    return (
      <div className="rent-item-container">
        <div className="rent-item-title">
          {itemProps.title}
        </div>
        <div className="rent-tags-container">
            <div
              className="rent-tag rent-location-tag"
              onClick={this.selectCity(itemProps.city, itemProps.zipCode)}
            >
            <i className="fa fa-map-marker" ></i>
            {itemProps.city}
          </div>

          <div className="rent-tag">
            {itemProps.rooms} Piéces
          </div>

          <div className="rent-tag">
            {itemProps.surface} m²
          </div>

          {itemProps.meuble === 1?<div className="rent-tag">Meublé</div>:<span></span>}
          {itemProps.isPerso === 1?<div className="rent-tag">Particulier</div>:<span></span>}

          <div className="rent-price">
            {itemProps.price}
            <i className="fa fa-eur"></i>
          </div>
          <img src={itemProps.imgSrc} />
        </div>
      </div>
    );
  }
}
