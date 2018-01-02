import React, { Component } from 'react';

export class RentListItem extends Component{
  consturctor(props) {
    this.super(props);
  }

  render() {
    const itemProps = this.props.item;
    return (
      <a href={itemProps.link}>
        <div> {itemProps.title} </div>
        <div> {itemProps.price} </div>
        <img src={itemProps.imgSrc} />
      </a>
    );
  }
}
