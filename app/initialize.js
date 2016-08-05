import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import config from './generated-config'

import reducer from './reducers'
import Root from './root'

const middlewares = config.env === 'production' || config.env === 'staging'
  ? []
  : []

const store = createStore(
  reducer,
  module.hot && module.hot.data && module.hot.data.state || {},
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f))

// hot module reloading
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

console.log('CONFIG', JSON.stringify(config, null, '  '))