import fetchMock from 'fetch-mock'

import { apiServer } from '../'
import user from './user.json'

fetchMock
  .mock(`${apiServer}/me/login`, 'POST', {})
  .mock(`${apiServer}/me/profile`, 'GET', user[0])
