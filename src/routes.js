import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './containers/HomePage'
import NoMatch from './containers/NoMatch'

export default (
  <Route path="/" component={ App }>
    <Route name="404" path="*" component={ NoMatch }/>
    <IndexRoute name="首页" component={ HomePage } />
  </Route>
)
