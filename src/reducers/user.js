import { handleActions } from 'redux-actions'
import { LOGIN } from '../actions/user'

const userReducer = handleActions({
  [LOGIN]: (state = {}) => state
}, {})

export default userReducer
