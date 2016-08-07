import assert from 'assert'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reducer, { startNewSession, changeQuantity, CHANGE_QUANTITY, QUANTITY_CHANGED } from './televendas-reducer'

describe('televendas', function() {
  it('startNewSession reducer', function() {
    const state = { session: 'old session' }
    Object.freeze(state) // to be sure the function will not mutate the state!
    const expected = { session: 'new session' }
    const action = startNewSession()

    assert.deepEqual(reducer(state, action), expected)
  })

  it('changeQuantity thunk', function(done) {
    const fakeApi = req => Promise.resolve({ status: 200 })
    const middlewares = [thunk.withExtraArgument(fakeApi)]
    const store = configureStore(middlewares)({ initial: 'state' })

    const expected = [
      { type: CHANGE_QUANTITY },
      { type: QUANTITY_CHANGED, payload: { status: 200 } }
    ]

    store.dispatch(changeQuantity())
      .then(store.getActions)
      .then(actions => assert.deepEqual(actions, expected))
      .then(done, done)
  })
})
