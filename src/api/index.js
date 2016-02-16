let server
let token = ''

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
export const apiServer = `${server}/api`
export const saveToken = (newToken) => token = newToken

export const PAGER_LIMIT = 10
export const getPager = (offset = 0, limit = PAGER_LIMIT) => `?from=${offset}&limit=${limit}`

/*
  ensure
  /api/me/*
  /api/admin/*
  have the auth header
*/
const isNeedAuth = /api\/((me)|(admin)|(sms))/i

export const postJson = (url, data = {}) => {
  let postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token && isNeedAuth.test(url)) {
    postData = Object.assign(postData, prepareHeader())
  }
  return fetch(url, Object.assign(postData, {
    body: JSON.stringify(data)
  }))
  .then(checkStatus)
  .then(fetchJson)
}

export const getJson = (url) => {
  let postData = {
    method: 'GET'
  }
  if (token && isNeedAuth.test(url)) {
    postData = Object.assign(postData, prepareHeader())
  }
  return fetch(url, postData)
    .then(checkStatus)
    .then(fetchJson)
}

export const upload = (url, file) => {
  const postData = {
    method: 'POST'
  }

  const formData = new FormData()
  formData.append('file', file)

  return fetch(`${url}?token=${token}`, Object.assign(postData, {
    body: formData
  }))
  .then(checkStatus)
  .then(fetchJson)
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 400) {
    return response
  }
  throw response
}
const fetchJson = response => {
  try {
    return response.json()
  } catch (e) {
    return Promise.resolve({})
  }
}

const prepareHeader = () => {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': ['Bearer ', token].join('')
    }
  }
}
