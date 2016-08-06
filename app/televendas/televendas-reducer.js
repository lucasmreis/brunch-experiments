//
// ACTION TYPES
//

const NEW_SESSION_STARTED = 'televendas/NEW_SESSION_STARTED'
const ASYNC_PROCESS_STARTED = 'televendas/ASYNC_PROCESS_STARTED'
const ASYNC_PROCESS_FAILED = 'televendas/ASYNC_PROCESS_FAILED'
const ASYNC_PROCESS_FINISHED = 'televendas/ASYNC_PROCESS_FINISHED'

//
// ACTION CREATORS
//

export function startNewSession() {
  return { type: NEW_SESSION_STARTED }
}

export function doSomethingAsync() {
  return function(dispatch, getState, api) {
    dispatch({ type: ASYNC_PROCESS_STARTED })
    return api({ url: 'http://swapi.co/api/people/2/', method: 'get' })
      .then(
        success => dispatch({ type: ASYNC_PROCESS_FINISHED, data: success }),
        error => dispatch({ type: ASYNC_PROCESS_FAILED, error }))
  }
}

//
// REDUCER
//

const initialState = { session: 'old session' }

export default function televendasReducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEW_SESSION_STARTED:
      return { ...state, session: 'new session' }

    default:
      return state
  }
}