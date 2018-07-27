import { expect } from 'chai'

import todoReducer from './todo'
import { addTodo } from '../actions/todos'

describe('on ADD_TODO event', () => {
  it('creates an object from the attributes in the action', () => {
    const action = addTodo(1)('foo')
    expect(todoReducer({}, action)).to.deep.equal({
      id: 1,
      title: 'foo',
      completed: false
    })
  })
})

describe('when action does not match', () => {
  it('returns null', () => {
    expect(todoReducer({}, { type: 'FOOBAR' })).to.be.null
  })
})
