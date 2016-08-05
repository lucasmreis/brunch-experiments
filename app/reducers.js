import { combineReducers } from 'redux'

import { televendasReducer } from './televendas'

export default combineReducers({
  televendas: televendasReducer
})
