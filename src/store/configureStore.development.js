import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from '../reducers'
import DevTools from '../utils/DevTools'

export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunk, promise),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
  )(createStore)(rootReducer, initialState)

  if (module.onReload) {
    module.onReload(() => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer.default || nextReducer)

      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true
    })
  }
  return store
}

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = global.location && global.location.href.match(/[?&]debug_session=([^&]+)\b/)
  return (matches && matches.length > 0) ? matches[1] : null
}
