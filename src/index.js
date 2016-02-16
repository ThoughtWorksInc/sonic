import { hashHistory } from 'react-router'

import baseApp from './baseApp'
import routes from './routes'
import configureStore from './store/configureStore'

const state = {
  shared: {
    app: {},
    user: {}
  }
}

if (process.env.NODE_ENV !== 'production') {
  require('./api/mocks')
}

const initialState = Object.assign(state, global.__INITIAL_STATE__ || {})
const store = configureStore(initialState, hashHistory)

baseApp(store, routes)
