import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RentsListItem } from '../../components/rents_list/rents_list_item';

class RentsList extends Component{
  constructor(props) {
    super(props);
    this.state = { rentQueryResult: [] };
  }

  render() {
    if(!this.props.rentQueryResult) {
      return <div></div>;
    }

    const JSXRentListItems = this.props.rentQueryResult.map(item => {
      return (
        <div key={item._id}>
          <RentsListItem item={item} />
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

export default connect(mapStateToProps)(RentsList);
