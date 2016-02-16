import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from '../reducers'

export default function configureStore(initialState, history) {
  const historyMiddleware = syncHistory(history)

  const store = compose(
    applyMiddleware(historyMiddleware, thunk, promise)
  )(createStore)(rootReducer, initialState)

  historyMiddleware.listenForReplays(store)

  return store
}
