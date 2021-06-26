import qs from 'query-string'

let fetch

if (process.server) {
  fetch = require('node-fetch')
} else {
  fetch = window.fetch ? window.fetch.bind(window) : require('unfetch')
}

export default function ApiPlugin({ $config, store }, inject) {
  // Accepts a Request tuple, like: ['get', '/users'].
  // Endpoints can be found in ../api/endpoints.js
  async function makeApiCall([method, endpoint], payload, withRefresh = true) {
    // Normalize the endpoint URL, by prefixing the API base URL.
    // Also appends a slash if it doesn't exist Just for convenience.
    let url = `${$config.apiURL}${endpoint}`

    let body
    if (method.toLowerCase() === 'get') {
      // Stringify the URL to a qs.
      url = `${url}?${qs.stringify(payload)}`
    } else {
      body = normalizePayload({ payload })
    }

    async function handleError(res) {
      let body
      try {
        body = await res.json()
      } catch {}

      const error = new Error((body && body.message) || res.statusText)
      error.body = body

      throw new Error(error)
    }

    const res = await fetch(url, {
      headers: {
        ...normalizeContentType(payload),
        accept: 'application/json',
        authorization: store.state.auth.token
          ? `Bearer oauth2-${store.state.auth.token}`
          : undefined,
      },
      method,
      body,
    })

    if (!res.ok) {
      return handleError(res, withRefresh)
    }

    if (res.status === 204) {
      return {}
    }

    return res.json()
  }

  inject('api', makeApiCall)
}

function normalizePayload({ payload }) {
  if (payload instanceof FormData) {
    return payload
  }

  const data = { ...payload }
  return JSON.stringify(data)
}

function normalizeContentType(payload) {
  if (!(payload instanceof FormData)) {
    return { 'content-type': 'application/json' }
  }

  return {}
}
