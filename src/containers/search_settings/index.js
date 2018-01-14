import React , { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { fetchRentCreator } from '../../actions/fetch_rent_by_zipcode';

class SearchSettings extends Component{
  consturctor(props) {
    this.super(props);
    // TODO: when to initialise the state var
  }

  loadLocalStorage() {
    if (!JSON.parse(localStorage.getItem('searchParams'))) {
      this.localSearchParams = {};
      return;
    }

    this.localSearchParams = JSON.parse(localStorage.getItem('searchParams'));
  }

  //load parmsbefore update
  updateLocaStorage(params) {
    this.loadLocalStorage();
    if (!localStorage.getItem('searchParams')) {
        localStorage.setItem('searchParams', JSON.stringify(params));
        return params;
    }


    // TODO: es6 , foreach, hasownProperty
    for(let key in params) {
      if(params.hasOwnProperty(key)) {
        this.localSearchParams[key] = params[key];
      }
    }

    localStorage.setItem('searchParams', JSON.stringify(this.localSearchParams));
  }

  onFormSubmit(values) {
    this.updateLocaStorage(values);
    this.props.fetchRentCreator(this.localSearchParams);
    this.props.zipCode;
  }

  renderCheckBoxField(field) {
    return (
      <label className={field.className}>
        {field.label}
        <input
          type="checkbox"
          {...field.input}
        />
        <span className="control__indicator"></span>
      </label>
    );
  }

  renderField(field) {
    //{...field.input}
    return (
      <span>
        <input
          className='search-card-input'
          placeholder={field.placeholder}
          type='text'
          defaultValue={field.defaultValue}
          onChange={field.input.onChange}
        />
      </span>
    );
  }

  render() {
    // TODO: dissolve on lot of files
    //const handleSubmit = this.props.handleSubmit;
    const { handleSubmit } = this.props;
    this.loadLocalStorage();

    return (
      <div>
        <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <div className="search-card">
          <div className="card-label">
            Votre Budget:
          </div>
           <div className="search-input-wrapper">
              <i className="fa fa-eur search-icon"></i>
              <Field
                name='maxPrice'
                placeholder='Budget Max'
                defaultValue={this.localSearchParams.maxPrice}
                component={this.renderField}
              />
            </div>
        </div>

        <div className="search-card">
          <div className="card-label">
              Type Locateur:
          </div>

          <div className="checkbox-card-container">
            <Field
              name='isPerso'
              label='Particulier'
              className='control control--checkbox'
              component={this.renderCheckBoxField}
              defaultValue={true}
            />
            <Field
              name='isPerso'
              label='Agence'
              className='control control--checkbox'
              component={this.renderCheckBoxField}
            />
          </div>
        </div>

        <div className="search-card">
          <div className="card-label">
            Surface:
          </div>
          <div className="search-input-wrapper">
            <i className="fa fa-home search-icon"></i>
            <Field
              name='minSurface'
              placeholder='Surface Minimal'
              component={this.renderField}
            />
          </div>
        </div>

        <div className="search-card">
          <div className="card-label">
              Nombre de Pieces:
          </div>

          <div className="checkbox-card-container">
            <Field
              name='F0'
              label='1'
              display='span'
              className='control control--checkbox inline-checkbox'
              component={this.renderCheckBoxField}
            />
            <Field
              name='F1'
              label='2'
              display='span'
              className='control control--checkbox inline-checkbox'
              component={this.renderCheckBoxField}
            />
            <Field
              name='F2'
              label='3'
              display='span'
              className='control control--checkbox inline-checkbox'
              component={this.renderCheckBoxField}
            />
            <Field
              name='F2'
              label='3'
              display='span'
              className='control control--checkbox inline-checkbox'
              component={this.renderCheckBoxField}
            />
            <Field
              name='F4'
              label='4+'
              display='span'
              className='control control--checkbox inline-checkbox'
              component={this.renderCheckBoxField}
            />
          </div>
        </div>

        <div className="search-card">
          <div className="card-label">
            Type Location:
          </div>
          <div className="checkbox-card-container">
            <Field
              name='isHouse'
              label='Maison'
              className='control control--checkbox'
              component={this.renderCheckBoxField}
              defaultValue={true}
            />
            <Field
              name='isAppart'
              label='Appartement'
              className='control control--checkbox'
              component={this.renderCheckBoxField}
            />
            <Field
              name='isStudio'
              label='Studio'
              className='control control--checkbox'
              component={this.renderCheckBoxField}
            />
            <Field
              name='isParking'
              label='Parking, Garage'
              className='control control--checkbox'
              component={this.renderCheckBoxField}
            />
            <Field
              name='isCommercial'
              label='Local Commercial'
              className='control control--checkbox'
              component={this.renderCheckBoxField}
            />
          </div>
        </div>


            <Field
              name='minPrice'
              placeholder='min Price'
              defaultValue='0'
              defaultValue={this.localSearchParams.minPrice}
              component={this.renderField}
            />
            <br />
          <input type='submit' value='rechercher' />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SearchSettingsForm',
})(
  // the first nul is for mapStateToProps calback
  connect(null, { fetchRentCreator })(SearchSettings)
);
