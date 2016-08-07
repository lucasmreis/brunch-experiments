import analytics from 'redux-analytics'

// type : COOKIE | LOCAL_STORAGE | SESSION_STORAGE
// payload : { key: String, value: String }

export function save(type, { key, value }) {
  // setTimeout used so storage saving does not block main thread
  setTimeout(function() {
    console.warn(`${type} > ${key}: ${value}`)
  })
}

const selector = ({ meta }) => meta.storage

const storageMiddleware =
  analytics(({ type, payload }) => save(type, payload), selector)

export default storageMiddleware