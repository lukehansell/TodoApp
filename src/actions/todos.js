export const ADD_TODO = Symbol()
export const UPDATE_TODO = Symbol()
export const REMOVE_TODO = Symbol()

export let idCounter = 0 // exported to enable better testing

export const addTodo = (id = ++idCounter) => (title = '') => ({
  type: ADD_TODO,
  id,
  title,
  completed: false
})

export const updateTodo = id => (updateValues = {}) => ({
  type: UPDATE_TODO,
  id,
  updateValues
})

export const removeTodo = id => ({ type: REMOVE_TODO, id })
