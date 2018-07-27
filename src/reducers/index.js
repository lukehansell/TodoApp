import { combineReducers } from 'redux'

import todos from './todos'
import filterBy from './filterBy'

export default combineReducers({
  todos,
  filterBy
})
