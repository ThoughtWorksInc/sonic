let server

/* istanbul ignore if */
if (global.location &&
  /* istanbul ignore next */
  global.location.origin) {
  server = global.location.origin
  /* istanbul ignore if */
} else if (process.env.NODE_ENV === 'development') {
  server = ''
} else {
  server = 'http://localhost:3000'
}

export const serverAddress = server
export const apiServer = server + '/api'

export const postJson = (url, data = {}) => {
  const postData = {
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
  const postData = {
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
