import { expect } from 'chai'

import {
  addTodo,
  updateTodo,
  removeTodo,
  idCounter,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO
} from './todos'

describe('addTodo', () => {
  describe('when called without an id', () => {
    it('uses the id counter to grab the next id', () => {
      expect(addTodo()().id).to.equal(idCounter)
    })
  })

  describe('when called with an id', () => {
    it('uses the id provided', () => {
      expect(addTodo(1)().id).to.equal(1)
    })
  })
  describe('when called with text', () => {
    let result
    beforeEach(() => {
      result = addTodo()('foo')
    })

    it('returns an object with the type "ADD_TODO"', () => {
      expect(result.type).to.equal(ADD_TODO)
    })

    it('returns an object with the text as title', () => {
      expect(result.title).to.equal('foo')
    })

    it('returns an object with completed attribute as false', () => {
      expect(result.completed).to.be.false
    })

    it('returns an object with an id', () => {
      expect(result.id).to.equal(idCounter)
    })
  })

  describe('when called multiple times', () => {
    let firstResult, secondResult
    beforeEach(() => {
      firstResult = addTodo()('foo')
      secondResult = addTodo()('bar')
    })

    it('increments the id by 1', () => {
      expect(secondResult.id).to.equal(idCounter)
    })
  })

  describe('when no text is passed', () => {
    let result
    beforeEach(() => {
      result = addTodo()()
    })

    it('defaults the text to ""', () => {
      expect(result.title).to.equal('')
    })
  })
})

describe('removeTodo', () => {
  let result
  beforeEach(() => {
    result = removeTodo(1)
  })

  it('returns an object with the type REMOVE_TODO', () => {
    expect(result.type).to.equal(REMOVE_TODO)
  })

  it('returns an object with the first argument as the id', () => {
    expect(result.id).to.equal(1)
  })
})

describe('updateTodo', () => {
  let result
  beforeEach(() => {
    result = updateTodo(1)({
      title: 'foobar',
      complete: true
    })
  })

  it('returns an object with the type UPDATE_TODO', () => {
    expect(result.type).to.equal(UPDATE_TODO)
  })

  it('returns an object with the id passed from the first function call', () => {
    expect(result.id).to.equal(1)
  })

  it('returns an object with the values to update passed from the second function call', () => {
    expect(result.updateValues).to.deep.equal({
      title: 'foobar',
      complete: true
    })
  })

  describe('without an object', () => {
    beforeEach(() => {
      result = updateTodo(1)()
    })

    it('returns a blank object as the updateValues', () => {
      expect(result.updateValues).to.deep.equal({})
    })
  })
})
