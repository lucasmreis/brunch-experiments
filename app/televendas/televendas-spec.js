import assert from 'assert'

import reducer, { startNewSession } from './televendas-reducer'

describe('televendas', function() {
  it('startNewSession', function() {
    const state = { session: 'old session' }
    Object.freeze(state) // to be sure the function will not mutate the state!
    const expected = { session: 'new session' }
    const action = startNewSession()

    assert.deepEqual(reducer(state, action), expected)
  })
})