import ReactDOM from 'react-dom'
import React from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import metricsMiddleware from './metrics'
import storageMiddleware from './storage'

import config from './generated-config'

import startup from './startup'
import reducer from './reducers'
import Root from './root'

import { startBasket } from './startup'

//
// REDUX STORE SETUP
//

const middlewares = config.env === 'development'
  ? [ thunk.withExtraArgument(axios), metricsMiddleware, storageMiddleware, createLogger() ]
  : [ thunk.withExtraArgument(axios), metricsMiddleware, storageMiddleware ]

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

//
// BASKET STARTUP
//

if (config.env === 'development') {
  console.log(`%c config = ${JSON.stringify(config, null, '  ')}`, 'color: navy; font-weight: bold')
}

const storage = { cartId: '123' } // parse ...
const urlQuery = { codItemFusion: '456' } // parse ...

// start!
store.dispatch(startBasket(storage, urlQuery))
