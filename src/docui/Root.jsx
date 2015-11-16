import React, {
  Component,
  PropTypes
} from 'react';
import {createStore, compose, combineReducers} from 'redux';
import {ReduxRouter, routerStateReducer, reduxReactRouter, pushState} from 'redux-router';

import {Route, Link} from 'react-router';
import {Provider, connect} from 'react-redux';
import {devTools} from 'redux-devtools';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {createHistory} from 'history';

import App from './App.jsx'
import Parent from './components/Parent.jsx'
import Child from './components/Child.jsx'

const reducer = combineReducers({router: routerStateReducer});

const store = compose(reduxReactRouter({createHistory}), devTools())
(createStore)
(reducer);

export default class Root extends Component {
  render () {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={App}>
              <Route path="parent" component={Parent}>
                <Route path="child" component={Child}/>
                <Route path="child/:id" component={Child}/>
              </Route>
            </Route>
          </ReduxRouter>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      </div>
    );
  }
}
