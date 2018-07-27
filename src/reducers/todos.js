import strictAssign from '../lib/strictAssign'

import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from '../actions/todos'

import todoReducer from './todo'

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_TODO: {
      return [...state, todoReducer({}, action)]
    }

    case REMOVE_TODO: {
      const { id } = action
      return state.filter(todo => todo.id !== id)
    }

    case UPDATE_TODO: {
      const { id, updateValues = {} } = action
      return state.map(updateIfIdMatch(id)(updateValues))
    }
  }

  return state
}

const updateIfIdMatch = id => updateValues => todo =>
  todo.id !== id ? todo : strictAssign(todo, updateValues)
