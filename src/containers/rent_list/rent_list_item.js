import React, { Component } from 'react';

export class RentListItem extends Component{
  consturctor(props) {
    this.super(props);
  }

  render() {
    const itemProps = this.props.item;
    return (
      <div className="rent-item-container">
        <div className="rent-item-title">
          {itemProps.title}
        </div>
        <div className="rent-tags-container">
          <div className="rent-tag">
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
            <i className="fa fa-eur"> </i>
          </div>
          <img src={itemProps.imgSrc} />
        </div>
      </div>
    );
  }
}
