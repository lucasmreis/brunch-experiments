const NEW_SESSION_STARTED = 'televendas/NEW_SESSION_STARTED'

const initialState = { session: 'old session' }

export default function televendasReducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEW_SESSION_STARTED:
      return { ...state, session: 'new session', a: 123 }

    default:
      return state
  }
}

export function startNewSession() {
  return { type: NEW_SESSION_STARTED }
}