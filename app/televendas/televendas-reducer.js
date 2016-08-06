//
// ACTION TYPES
//

const NEW_SESSION_STARTED = 'televendas/NEW_SESSION_STARTED'
const CHANGE_QUANTITY = 'televendas/CHANGE_QUANTITY'
const CHANGE_QUANTITY_FAILED = 'televendas/CHANGE_QUANTITY_FAILED'
const QUANTITY_CHANGED = 'televendas/QUANTITY_CHANGED'

//
// ACTION CREATORS
//

export function startNewSession() {
  return { type: NEW_SESSION_STARTED }
}

export function changeQuantity() {
  return function(dispatch, getState, api) {
    dispatch({ type: CHANGE_QUANTITY })
    return api({ url: 'http://swapi.co/api/people/2/', method: 'get' })
      .then(
        success => dispatch({ type: QUANTITY_CHANGED, data: success }),
        error => dispatch({ type: CHANGE_QUANTITY_FAILED, error }))
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