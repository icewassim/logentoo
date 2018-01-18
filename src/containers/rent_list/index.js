import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RentListItem } from './rent_list_item';

class RentList extends Component{
  constructor(props) {
    super(props);
    this.state = { rentQueryResult: [] };
  }

  render() {
    if(!this.props.rentQueryResult) {
      return <div></div>;
    }

    const JSXRentListItems = this.props.rentQueryResult.map((item, idx) => {
      return (
        <div key={idx}>
          <RentListItem item={item} />
        </div>
      );
    })
    return <div>{JSXRentListItems}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    rentQueryResult: state.rentQueryResult,
  };
}

export default connect(mapStateToProps)(RentList);
