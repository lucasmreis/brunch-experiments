//
// ACTION TYPES
//

export const BASKET_STARTED = 'startup/BASKET_STARTED'

//
// ACTION CREATORS
//

export function startBasket(cookies, urlQuery) {
  return {
    type: BASKET_STARTED,

    meta: {
      storage: {
        type: 'COOKIE',
        payload: { key: 'cart.id', value: '12345' }
      }
    }
  }
}

//
// REDUCER
//

const initialState = {}

export default function startupReducer(state = initialState, action = {}) {
  switch (action.type) {
    case BASKET_STARTED:
      return { ...state, loading: true }

    default:
      return state
  }
}