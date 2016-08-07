import { combineReducers } from 'redux'

import { startupReducer } from './startup'
import { televendasReducer } from './televendas'

export default combineReducers({
  startup: startupReducer,
  televendas: televendasReducer
})
