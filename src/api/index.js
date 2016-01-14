let server

/* istanbul ignore if */
if (global.location &&
  /* istanbul ignore next */
  global.location.origin) {
  server = global.location.origin
} else if (process.env.NODE_ENV === 'development') {
  /* istanbul ignore next */
  server = ''
} else {
  server = 'http://localhost:3000'
}

export const serverAddress = server
export const apiServer = server + '/api'

export const postJson = (url, data = {}) => {
  let postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(url, Object.assign(postData, {
    body: JSON.stringify(data)
  }))
  .then(fetchJson)
}

export const getJson = (url) => {
  let postData = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(url, postData).then(fetchJson)
}

const fetchJson = response => {
  if (response.status >= 400) {
    throw new Error('Bad response from server')
  }

  return response.json()
}
