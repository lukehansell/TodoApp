import { expect } from 'chai'

import todosReducer from './todos'
import { addTodo, removeTodo, updateTodo } from '../actions/todos'

describe('with no init state', () => {
  describe('with no action', () => {
    let result
    beforeEach(() => {
      result = todosReducer()
    })

    it('returns an empty array', () => {
      expect(result).to.deep.equal([])
    })
  })
})

describe('with init state', () => {
  const initState = []
  let result
  beforeEach(() => {
    result = todosReducer(initState)
  })

  it('returns the current state passed in', () => {
    expect(result).to.equal(initState)
  })
})

describe('on ADD_TODO action', () => {
  const initState = []

  describe('on first call', () => {
    let result
    beforeEach(() => {
      result = todosReducer(initState, addTodo(1)('bar'))
    })

    it('returns the state with a new todo object appended', () => {
      const expected = [
        {
          id: 1,
          title: 'bar',
          completed: false
        }
      ]

      expect(result).to.deep.equal(expected)
    })
  })

  describe('when called multiple times', () => {
    let result
    beforeEach(() => {
      const firstState = todosReducer(initState, addTodo(1)('foo'))
      result = todosReducer(firstState, addTodo(2)('bar'))
    })

    it('returns the updated state with the todo objects appended', () => {
      const expected = [
        {
          id: 1,
          title: 'foo',
          completed: false
        },
        {
          id: 2,
          title: 'bar',
          completed: false
        }
      ]

      expect(result).to.deep.equal(expected)
    })
  })
})

describe('on REMOVE_TODO action', () => {
  const initialState = [
    {
      id: 1,
      title: 'foo',
      complete: false
    },
    {
      id: 2,
      title: 'bar',
      complete: false
    }
  ]

  describe('when no id is provided on the action', () => {
    let result
    beforeEach(() => {
      const action = removeTodo()
      result = todosReducer(initialState, action)
    })

    it('returns the state unaltered', () => {
      expect(result).to.deep.equal(initialState)
    })
  })

  describe('when id which does not match an item is provided', () => {
    let result
    beforeEach(() => {
      const action = removeTodo(3)
      result = todosReducer(initialState, action)
    })

    it('returns the state unaltered', () => {
      expect(result).to.deep.equal(initialState)
    })
  })

  describe('when id of a matching item is provided', () => {
    let result
    beforeEach(() => {
      const action = removeTodo(2)
      result = todosReducer(initialState, action)
    })

    it('returns the state without the specified item', () => {
      const expected = [initialState[0]]
      expect(result).to.deep.equal(expected)
    })

    it('does not affect the initial state item', () => {
      expect(initialState).to.have.length(2)
    })
  })

  describe('on UPDATE_TODO action', () => {
    const initialState = [
      {
        id: 1,
        title: 'foo',
        completed: true
      },
      {
        id: 2,
        title: 'bar',
        completed: false
      }
    ]

    describe('when id is not provided', () => {
      let result
      beforeEach(() => {
        const action = updateTodo()()
        result = todosReducer(initialState, action)
      })

      it('returns the state unaltered', () => {
        expect(result).to.deep.equal(initialState)
      })
    })

    describe('when id does not match an item', () => {
      let result
      beforeEach(() => {
        const action = updateTodo(3)()
        result = todosReducer(initialState, action)
      })

      it('returns the state unaltered', () => {
        expect(result).to.deep.equal(initialState)
      })
    })

    describe('when id is provided and matches an item', () => {
      describe('when no updateValues are provided', () => {
        let result
        beforeEach(() => {
          const action = updateTodo(2)()
          result = todosReducer(initialState, action)
        })

        it('returns the state unaltered', () => {
          expect(result).to.deep.equal(initialState)
        })
      })

      describe('when updateValues are provided', () => {
        let result
        beforeEach(() => {
          const action = updateTodo(2)({
            title: 'baz',
            completed: true,
            foo: 'bar'
          })
          result = todosReducer(initialState, action)
        })

        it('returns the state with the values updated on the selected item', () => {
          const expected = [
            initialState[0],
            {
              id: 2,
              title: 'baz',
              completed: true
            }
          ]

          expect(result).to.deep.equal(expected)
        })

        it('does not affect the inital state item', () => {
          expect(initialState[1].title).to.equal('bar')
        })
      })

      describe('when updating to false', () => {
        let result
        beforeEach(() => {
          const action = updateTodo(1)({
            completed: false
          })
          result = todosReducer(initialState, action)
        })

        it('updates the value', () => {
          expect(result[0].completed).to.be.false
        })
      })
    })
  })
})
