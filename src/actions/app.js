import { createAction } from 'redux-actions'
import { isFSA } from 'flux-standard-action'

export const INIT = 'APP_INIT'
export const LOADING = 'APP_LOADING'
export const ERROR_MESSAGE = 'APP_ERROR_MESSAGE'
export const ERROR = 'APP_TOGGLE_ERROR_POPUP'

export const createLoadingAction = (type, actionCreator, metaCreator) => {
  const finalActionCreator = typeof actionCreator === 'function'
    ? actionCreator
    : identity

  return (...args) => {
    const action = finalActionCreator(...args)

    if (isPromise(action)) {
      return (dispatch, getState) => {
        let minTickBlocker = true
        setTimeout(() => {
          minTickBlocker = false
        }, 600)
        dispatch(loading())
        action.then(response => {
          if (isFSA(response)) {
            dispatch(response)
          } else {
            dispatch({
              type,
              payload: response
            })
          }

          if (!minTickBlocker) {
            const state = getState()
            const isLoading = state.shared.app && state.shared.app.loading

            if (isLoading) {
              dispatch(loading())
            }
          } else {
            setTimeout(() => {
              const state = getState()
              const isLoading = state.shared.app && state.shared.app.loading

              if (isLoading) {
                dispatch(loading())
              }
            }, 600)
          }
        })
        .catch(err => {
          const state = getState()
          const isLoading = state.shared.app && state.shared.app.loading

          if (isLoading) {
            dispatch(loading())
          }

          if (err && err.json) {
            try {
              err.json()
              .then(json => {
                dispatch(error({
                  message: json.error || json.message
                }))
                dispatch(showError())
              })
            } catch (e) {
              dispatch(error({
                message: e.error || e.message
              }))
              dispatch(showError())
            } finally {
              throw err
            }
          }
        })
      }
    }

    return {
      type,
      payload: action
    }
  }
}

export const init = () => (dispatch, getState) => {
  appEffect(dispatch)
  global.onresize = (event) => appEffect(dispatch)
}
const appEffect = (dispatch) => {
  // side effects to load initialized data
  const {
    innerHeight,
    innerWidth
  } = global

  dispatch({
    type: INIT,
    payload: {
      width: innerWidth,
      height: innerHeight
    }
  })
}

export const loading = createAction(LOADING)
export const error = createAction(ERROR_MESSAGE)
export const showError = () => (dispatch, getState) => {
  const type = ERROR
  setTimeout(() => {
    dispatch({
      type,
      payload: true
    })
  }, 600)
  setTimeout(() => {
    dispatch({
      type,
      payload: true
    })
  }, 2200)
}

const identity = t => t
const isPromise = val => val && typeof val.then === 'function'
