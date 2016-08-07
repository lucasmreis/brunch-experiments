import ReactDOM from 'react-dom'
import React from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import analytics from 'redux-analytics'

import config from './generated-config'

import track from './metrics'
import reducer from './reducers'
import Root from './root'

//
// REDUX STORE SETUP
//

const metricsMiddleware = analytics(({ type, payload }, state) => track(type, payload, state))

const middlewares = config.env === 'development'
  ? [ thunk.withExtraArgument(axios), metricsMiddleware, createLogger() ]
  : [ thunk.withExtraArgument(axios), metricsMiddleware ]

const store = createStore(
  reducer,
  module.hot && module.hot.data && module.hot.data.state || {},
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f))

//
// HOT MODULE RELOADING
//

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })
  module.hot.accept()

  module.hot.dispose((data) => {
    data.state = store.getState()
    ;[].slice.apply(document.querySelector('#app').children).forEach(function(c) { c.remove() })
  })
}

//
// REACT APPLICATION START
//

const load = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector('#app')
  )
}

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load)
} else {
  load()
}

if (config.env === 'development') {
  console.log('CONFIG', JSON.stringify(config, null, '  '))
}