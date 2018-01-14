import React , { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { fetchRentCreator } from '../../actions/fetch_rent_by_zipcode';

class SearchSettings extends Component{
  constructor(props) {
    super(props);
    this.state = { searchParams: {}}
    this.initializeSearch();
  }

  loadLocalStorage() {
    if (!JSON.parse(localStorage.getItem('searchParams'))) {
      this.state.searchParams = {};
      return;
    }

    this.state.searchParams = JSON.parse(localStorage.getItem('searchParams'));
  }

  initializeSearch() {
    this.loadLocalStorage();
    this.props.fetchRentCreator(this.state.searchParams);
  }

  updateLocaStorage(params) {
    this.loadLocalStorage();
    if (!localStorage.getItem('searchParams')) {
        localStorage.setItem('searchParams', JSON.stringify(params));
        return params;
    }


    // TODO: es6 , foreach, hasownProperty
    for(let key in params) {
      if(params.hasOwnProperty(key)) {
        this.state.searchParams[key] = params[key];
      }
    }

    localStorage.setItem('searchParams', JSON.stringify(this.state.searchParams));
  }

  onFormSubmit(values) {
    debugger;
    this.updateLocaStorage(values);
    this.props.fetchRentCreator(this.state.searchParams);
  }

  renderCheckBoxField(field) {
    //if(field.label == 'Particulier') debugger

    if (field.input.value === '') {
     field.input.value = field.defaultValue;
    }

    return (
      <label className={field.className}>
        {field.label}
        <input
          type="checkbox"
          checked={field.input.value ? "checked":""}
          {...field.input}
        />
        <span className="control__indicator"></span>
      </label>
    );
  }

  checkBoxChanged(evt) {
    let newParam = {};
    newParam[this.name] = this.value;
    this.searchParamsRef.onFormSubmit(newParam);
    return this.formCallback(evt);
  }

  renderCheckBoxFieldTest(field, other) {
    console.log('field.input.value', other);
    return (
      <label className={field.className}>
        {field.label}
        <input
          onChange={field.onChangeWrapper.bind({
            name: field.name,
            value: field.input.value,
            formCallback: field.input.onChange,
            fieldRef: field,
            searchParamsRef: this,
          })}
          type="checkbox"
          value="test"
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
                defaultValue={this.state.searchParams.maxPrice}
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
              normalize={v => !!v}
              def={this.state.searchParams.isPerso}
              onChangeWrapper={this.checkBoxChanged}
              component={this.renderCheckBoxFieldTest.bind(this)}
            />
            <Field
              name='isPro'
              label='Agence'
              className='control control--checkbox'
              defaultValue={this.state.searchParams.isPro}
              component={this.renderCheckBoxField.bind(this)}
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
              defaultValue={this.state.searchParams.minPrice}
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
