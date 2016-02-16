import { handleActions } from 'redux-actions'

import { INIT, LOADING, ERROR_MESSAGE, ERROR } from '../actions/app'

export default handleActions({
  [LOADING]: (state = {}) => {
    return {
      ...state,
      loading: !state.loading
    }
  },
  [ERROR_MESSAGE]: (state = {}, action) => {
    const { message } = action.payload

    return {
      ...state,
      errorMessage: message
    }
  },
  [ERROR]: (state = {}) => {
    return {
      ...state,
      showErrorMessage: !state.showErrorMessage
    }
  },
  [INIT]: (state, action) => ({ ...state, ...action.payload })
}, {
  token: null
})
