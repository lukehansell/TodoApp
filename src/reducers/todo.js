import { ADD_TODO } from '../actions/todos'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_TODO: {
      const { id, title, completed } = action
      return {
        id,
        title,
        completed
      }
    }

    default: {
      return null
    }
  }
}
