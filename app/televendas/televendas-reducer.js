//
// ACTION TYPES
//

export const NEW_SESSION_STARTED = 'televendas/NEW_SESSION_STARTED'
export const CHANGE_QUANTITY = 'televendas/CHANGE_QUANTITY'
export const CHANGE_QUANTITY_FAILED = 'televendas/CHANGE_QUANTITY_FAILED'
export const QUANTITY_CHANGED = 'televendas/QUANTITY_CHANGED'

//
// ACTION CREATORS
//

export function startNewSession() {
  return {
    type: NEW_SESSION_STARTED,

    // DESCOMENTAR APENAS NA HORA DE EXPLICAR O ANALYTICS

    // meta: {
    //   analytics: { type: 'metric:type', payload: { some: 'info' } }
    // }
  }
}

export function changeQuantity() {
  return function(dispatch, getState, api) {
    dispatch({ type: CHANGE_QUANTITY })
    return api({ url: 'http://swapi.co/api/people/2/', method: 'get' })
      .then(
        success => dispatch({ type: QUANTITY_CHANGED, payload: success }),
        error => dispatch({ type: CHANGE_QUANTITY, error: true }))
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