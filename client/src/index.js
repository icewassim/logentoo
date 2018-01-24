import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from 'redux-promise';

import { App } from './components/app';
import HomePage from './components/home_page';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter >
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={App} />
      </Switch>
    </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));
