import 'isomorphic-fetch'
import React from 'react'
import ReactPerf from 'react-addons-perf'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'

import routes from './routes'
import configureStore from './store/configureStore'

const state = {}

if (process.env.NODE_ENV !== 'production') {
  require('./api/mocks')
}

const initialState = Object.assign(state, global.__INITIAL_STATE__ || {})
const store = configureStore(initialState)

// Installs hooks that always keep react-router and redux
// store in sync
syncReduxAndRouter(hashHistory, store)

window.React = React
window.Perf = ReactPerf

render(
  <Provider store={ store }>
    <Router history={ hashHistory }>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development') {
  const devTool = require('./utils/openDevTool')
  devTool.default(store)
}
