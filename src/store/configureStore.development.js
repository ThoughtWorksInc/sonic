import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from '../reducers'
import DevTools from '../utils/DevTools'

export default function configureStore(initialState, history) {
  const historyMiddleware = syncHistory(history)
  const store = compose(
    applyMiddleware(historyMiddleware, thunk, promise),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
  )(createStore)(rootReducer, initialState)

  historyMiddleware.listenForReplays(store)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }
  return store
}

function getDebugSessionKey() {
  return global.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
}
