import { apiServer, getJson, postJson } from './'

export default {
  login: () => postJson(`${apiServer}/me/login`),
  logout: () => Promise.resolve({ id: 0 }),
  profile: () => getJson(`${apiServer}/me/profile`)
}
