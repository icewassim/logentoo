import React, { PropTypes } from 'react';

function RentsListItem({ item }) {
  return (
    <div className="rent-item-container">
      <a className="rent-item-title" href={item.link} target="_blank" >
        {item.title}
      </a>
      <div className="rent-tags-container">
        <div className="rent-tag rent-location-tag">
          <i className="fa fa-map-marker" />
          {item.city}
        </div>

        <div className="rent-tag">
          {item.rooms} Piéces
        </div>

        {item.surface == 1 ? '' : <div className="rent-tag">{item.surface}  m²</div>}

        {item.meuble === 1 ? <div className="rent-tag">Meublé</div> : <span />}
        {item.isPerso === 1 ? <div className="rent-tag">Particulier</div> : <span />}

        <div className="rent-price">
          {item.price}
          <i className="fa fa-eur" />
        </div>

        <div className={"rent-tag source-tag-" + item.source}>
          {item.source === 0 && "leboncoin"}
          {item.source === 1 && "pap.fr"}
          {item.source === 2 && "seloger"}
        </div>
        <a className="rent-item-title" href={item.link} target="_blank" >
          <img src={item.imgSrc || '/client/assets/images/no-thumb.png'} alt={item.title} />
        </a>
      </div>
    </div>
  );
}

RentsListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    meuble: PropTypes.number.isRequired,
    isPerso: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    surface: PropTypes.number.isRequired,
  }).isRequired,
};

export default RentsListItem;
