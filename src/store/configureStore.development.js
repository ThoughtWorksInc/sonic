import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import createHashHistory from 'history/lib/createHashHistory';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const history = createHashHistory();

export default function configureStore(initialState, routes) {
  const store = compose(
    reduxReactRouter({routes, history}),
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    )
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
