import { expect } from 'chai'
import rootReducer from './index'

import { createStore } from 'redux'

describe('root reducer', () => {
  describe('on initialisation', () => {
    let store

    beforeEach(() => {
      store = createStore(rootReducer)
    })

    it('creates a store with todos', () => {
      expect(store.getState()).to.haveOwnProperty('todos')
    })

    it('creates a store with a filter state', () => {
      expect(store.getState()).to.haveOwnProperty('filterBy')
    })
  })
})
