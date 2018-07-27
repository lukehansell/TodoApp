import React from 'react'

import { shallow } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

import Todo from '../Todo'
import TodoList from '../TodoList'

const sandbox = sinon.createSandbox()

describe('TodoList component', () => {
  const todos = [
    {
      id: 1,
      text: 'foo',
      completed: true
    },
    {
      id: 2,
      text: 'bar',
      completed: false
    }
  ]

  let result, onDelete, onToggleComplete
  beforeEach(() => {
    onDelete = sandbox.stub()
    onToggleComplete = sandbox.stub()
    const onDeleteHOF = sandbox
      .stub()
      .withArgs(1)
      .returns(onDelete)
    const onToggleCompleteHOF = sandbox
      .stub()
      .withArgs(1)
      .returns(onToggleComplete)

    result = shallow(
      <TodoList
        todos={todos}
        onToggleComplete={onToggleCompleteHOF}
        onDelete={onDeleteHOF}
      />
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('renders without error', () => {
    shallow(<TodoList />)
  })

  it('is a ul', () => {
    expect(result).to.have.tagName('ul')
  })

  it('maps over todos prop and an li', () => {
    expect(result.find('li')).to.have.length(2)
  })

  it('renders a Todo component in each li', () => {
    const expected = (
      <Todo
        title="foo"
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        isComplete={true}
      />
    )
    expect(result.find('li').first()).to.contain(expected)
  })
})
