import React , { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { fetchRentCreator } from '../../actions/fetch_rent_by_zipcode';

class SearchSettings extends Component{
  consturctor(props) {
    this.super(props);
    // TODO: when to initialise the state var
  }

  updateInputValueMinPrice(evt) {
    this.setState({
      Price: {
        min: evt.target.value,
      }
    })
  }

  updateInputValueMaxPrice(evt) {
    this.setState({
      Price: {
        max: evt.target.value,
      }
    })
  }

  updateParams(params) {
    if (!localStorage.getItem('searchParams')) {
        localStorage.setItem('searchParams', JSON.parse(params));
        return params;
    }

    const storedParams = JSON.parse(localStorage.getItem('searchParams'));
    // TODO: es6
    storedParams.maxPrice = params.maxPrice;
    storedParams.minPrice = params.minPrice;

    localStorage.setItem('searchParams', JSON.stringify(storedParams));
    return storedParams;
  }

  onFormSubmit(values) {
    const searchParams = this.updateParams(values);
    this.props.fetchRentCreator(searchParams);
    this.props.zipCode;
  }

  renderField(field) {
    return (
      <span>
        <input
          placeholder={field.placeholder}
          value={field.defaultVal}
          type='text'
          {...field.input}
        />
      </span>
    );
  }

  render() {
    //const handleSubmit = this.props.handleSubmit;
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
            <Field
              name='maxPrice'
              placeholder='max Price'
              defaultVal='2000'
              component={this.renderField}
            />
            <Field
              name='minPrice'
              placeholder='min Price'
              default='10'
              component={this.renderField}
            />
            <br />
            <Field
              name='minRooms'
              placeholder='min Rooms'
              component={this.renderField}
            />
            <Field
              name='maxRooms'
              placeholder='max Rooms'
              component={this.renderField}
            />
            <br />
            <Field
              name='minSurface'
              placeholder='min Surface'
              component={this.renderField}
            />
            <Field
              name='maxSurface'
              placeholder='max Surface'
              component={this.renderField}
            />
          <input type='submit' value='rechercher' />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SearchSettingsForm',
})(
  connect(null, { fetchRentCreator })(SearchSettings)
);
