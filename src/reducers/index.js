import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'
import { reducer as formReducer } from 'redux-form'

import user from './user'

const rootReducer = combineReducers({
  user,
  form: formReducer,
  routing
})

export default rootReducer
