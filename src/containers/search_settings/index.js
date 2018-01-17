import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchRentCreator } from '../../actions/fetch_rent_by_zipcode';
import Checkbox from '../../components/checkbox';
import {
  typeLocaterBox,
  nbrPieceBox,
  typeLocationBox,
  fieldsNames,
  maxBudgetSearchBox,
  minSurfaceSearchBox
} from '../../config/search_form_conf';

class SearchSettings extends Component{
  constructor(props) {
    super(props);
    this.state = { searchParams: {}};
    this.mountLocalStorageToState();
  }

  componentDidMount() {
    this.props.fetchRentCreator(this.state);
  }

  mountLocalStorageToState() {
    if (!JSON.parse(localStorage.getItem('searchParams'))) {
      this.state = {};
      return;
    }

    this.state = JSON.parse(localStorage.getItem('searchParams'));
  }

  componentDidUpdate(prevProp, prevState) {
    this.updateLocaStorage(); // update localStorage
    this.props.fetchRentCreator(this.state); // fetch Api
  }

  handleInputChange(evt) {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newSearchValues = {
      [target.name]: value,
    };

    // setState is asynchronus
    this.setState(newSearchValues); //update state
  }

  updateLocaStorage() {
    let newLocalStorage = {};
    for (let i = 0; i < fieldsNames.length; i++) {
      let fieldName = fieldsNames[i];
      let fieldValue = this.state[fieldName];
      newLocalStorage[fieldName] = fieldValue;
    }

    localStorage.setItem('searchParams', JSON.stringify(newLocalStorage));
  }

  onFormSubmit(evt) {
    evt.preventDefault();
  }

  mapConfCheckBoxToJSX({ name, label }) {
    return (
      <span key={name}>
        <Checkbox
          name={name}
          label={label}
          checked={this.state[name]}
          handleInputChange={this.handleInputChange.bind(this)}
        />
      </span>
    );
  }

  mapConfSearchBoxToJSX(fieldConf) {
    return (
      <div className="search-card" key={fieldConf.name}>
        <div className="card-label">
          {fieldConf.label}:
        </div>
         <div className="search-input-wrapper">
            <i className={fieldConf.iconClassName}></i>
            <input
              name='maxPrice'
              placeholder={fieldConf.placeholder}
              className='search-card-input'
              value={this.state[fieldConf.name]}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <br />
      </div>
    );
  }

  render() {
    const TypeLocateurJSX = typeLocaterBox.map(this.mapConfCheckBoxToJSX.bind(this));
    const NbrPieceJSX = nbrPieceBox.map(this.mapConfCheckBoxToJSX.bind(this));
    const TypeLocationJSX = typeLocationBox.map(this.mapConfCheckBoxToJSX.bind(this));
    const MaxBudgetJSX = maxBudgetSearchBox.map(this.mapConfSearchBoxToJSX.bind(this));
    const MinSurfaceJSX = minSurfaceSearchBox.map(this.mapConfSearchBoxToJSX.bind(this));

    return (
      <div>
        <form onSubmit={this.onFormSubmit}>

          {MaxBudgetJSX}

          <div className="search-card">
            <div className="card-label">
                Type Locateur:
            </div>
            <div className="checkbox-card-container">
              {TypeLocateurJSX}
            </div>
          </div>

          {MinSurfaceJSX}

          <div className="search-card">
            <div className="card-label">
                Nombre de Pieces:
            </div>
            <div className="checkbox-card-container linear">
              {NbrPieceJSX}
            </div>
          </div>

          <div className="search-card">
            <div className="card-label">
              Type Location:
            </div>
            <div className="checkbox-card-container">
              {TypeLocationJSX}
            </div>
          </div>

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchRentCreator }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchSettings);
