import fetchMock from 'fetch-mock'

import { apiServer, getJson, postJson } from '../index'

const fakeData = {}
const fakeAPI = apiServer + '/get'

describe('API index', () => {
  it('should get API server url', () => {
    apiServer.should.be.containEql('/api')
  })
  it('should call fetch GET', (done) => {
    fetchMock.reMock(fakeAPI, 'GET', fakeData)
    getJson(fakeAPI)
    .then(json => {
      json.should.be.an.Object
      done()
    })
  })

  it('should call fetch POST', (done) => {
    fetchMock.reMock(fakeAPI, 'POST', fakeData)
    postJson(fakeAPI)
    .then(json => {
      json.should.be.an.Object
      done()
    })
  })

  it('should handle GET error', (done) => {
    fetchMock.reMock(fakeAPI, 'GET', 404)
    getJson(fakeAPI)
    .catch(err => {
      err.should.be.an.Object
      done()
    })
  })
  it('should handle POST error', (done) => {
    fetchMock.reMock(fakeAPI, 'POST', 404)
    postJson(fakeAPI)
    .catch(err => {
      err.should.be.an.Object
      done()
    })
  })
})
