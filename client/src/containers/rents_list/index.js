import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';

import RentsListItem from '../../components/rents_list/rents_list_item';
import fetchRentCreator from '../../actions/fetch_rent';

class RentsList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      pageIdx: 1,
      searchParams: JSON.parse(localStorage.getItem('searchParams')),
    };
  }

  loadMore() {
    if (!this.props.rentQueryResult || this.props.rentQueryResult.length === 0) {
      return;
    }

    const localStoredParams = JSON.parse(localStorage.getItem('searchParams'));
    let newSearchConfigDetected = false;
    if (!_.isMatch(localStoredParams, this.state.searchParams)) {
      this.setState({ searchParams: localStoredParams });
      newSearchConfigDetected = true;
    }

    //console.log('comparing this.state.pageIdx['+(this.state.pageIdx * 10 )+'] to this.props.rentQueryResult'+ this.props.rentQueryResult.length);
    if((this.state.pageIdx * 10) > this.props.rentQueryResult.length && !newSearchConfigDetected) {
      this.setState({ waitForLoading: true });
      return;
    }

    const newPageIdx = newSearchConfigDetected ? 1: this.state.pageIdx + 1;
    this.props.fetchRentCreator(localStoredParams, newPageIdx);
    this.setState({ waitForLoading: true });
    this.setState({ pageIdx : newPageIdx });
    setTimeout(() => {
      this.setState({ waitForLoading: false });
    }, 1000);
  }

  render() {
    if (!this.props.rentQueryResult) {
      return '';
    }

    const JSXRentListItems = this.props.rentQueryResult.map(item => <RentsListItem item={item} key={item.annonce_id} />);
    return (
      <InfiniteScroll
        pageStart={ 0 }
        loadMore={ this.loadMore.bind(this) }
        hasMore={ !this.state.waitForLoading }
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {JSXRentListItems}
      </InfiniteScroll>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchRentCreator }, dispatch);
}

function mapStateToProps(state) {
  return {
    rentQueryResult: state.rentQueryResult,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RentsList);
