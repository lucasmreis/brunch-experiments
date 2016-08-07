import analytics from 'redux-analytics'

export function track(type, payload) {
  console.warn('METRIC:', type, payload)
}

const metricsMiddleware =
  analytics(({ type, payload }, state) => track(type, payload, state))

export default metricsMiddleware