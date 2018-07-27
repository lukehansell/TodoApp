import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { createStore } from 'redux'

import reducers from '../reducers'

import withTodos from './withTodos'

const sandbox = sinon.createSandbox()

const DummyComponent = () => <div />

describe('withTodos', () => {
  let result
  beforeEach(() => {
    const store = createStore(reducers)
    const DummyComponentWithTodos = withTodos(DummyComponent)
    result = <DummyComponentWithTodos foo={'bar'} store={store} />
  })
})
