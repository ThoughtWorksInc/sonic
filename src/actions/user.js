import { createAction } from 'redux-actions'
import userApi from '../api/user'

export const LOGIN = 'USER_LOGIN'
export const LOGOUT = 'USER_LOGOUT'

export const login = createAction(LOGIN, () => userApi.login())
export const logout = createAction(LOGOUT, () => userApi.logout())
