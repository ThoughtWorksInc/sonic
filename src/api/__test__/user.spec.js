import fetchMock from 'fetch-mock'

import { apiServer } from '../'
import userApi from '../user'

describe('User API', () => {
  it('should be able to get a Promise', () => {
    userApi.login().then.should.be.a.Function
    userApi.logout().then.should.be.a.Function
  })

  it('should return user profile', done => {
    fetchMock.reMock(`${apiServer}/me/profile`, 'GET', {})
    userApi.profile().then(response => {
      response.should.be.Existed
      response.should.be.a.Object
      done()
    })
  })
  it('should return current login user', done => {
    fetchMock.reMock(`${apiServer}/me/login`, 'POST', {})
    userApi.login().then(response => {
      response.should.be.Existed
      response.should.be.a.Object
      done()
    })
  })
  it('should handle error when wrong login user', done => {
    fetchMock.reMock(`${apiServer}/me/login`, 'POST', 403)
    userApi.login().catch(err => {
      err.should.be.Existed
      done()
    })
  })
  it('should return current logout user', done => {
    userApi.logout().then(response => {
      response.should.be.Existed
      response.should.be.a.Object
      done()
    })
  })
})
