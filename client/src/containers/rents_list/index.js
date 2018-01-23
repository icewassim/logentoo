import React from 'react';
import { connect } from 'react-redux';

import RentsListItem from '../../components/rents_list/rents_list_item';

function RentsList({ rentQueryResult }) {
  if (!rentQueryResult) {
    return '';
  }

  const JSXRentListItems = rentQueryResult.map(item => <RentsListItem item={item} key={item._id} />);
  return <div>{JSXRentListItems}</div>;
}

function mapStateToProps(state) {
  return {
    rentQueryResult: state.rentQueryResult,
  };
}

export default connect(mapStateToProps)(RentsList);
