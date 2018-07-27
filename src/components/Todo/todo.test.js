import React from 'react'

import { shallow } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

import Todo from '../Todo'

const sandbox = sinon.createSandbox()

describe('todo component', () => {
  let result, onDeleteHandler, onToggleCompleteHandler

  beforeEach(() => {
    onDeleteHandler = sandbox.stub()
    onToggleCompleteHandler = sandbox.stub()

    result = shallow(
      <Todo
        onDelete={onDeleteHandler}
        onToggleComplete={onToggleCompleteHandler}
        title="title"
        isComplete={true}
      />
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('renders without error', () => {
    shallow(<Todo />)
  })

  describe('containing div', () => {
    it('exists', () => {
      expect(result).to.have.tagName('div')
    })

    it('has the class of "todo-item"', () => {
      expect(result).to.have.className('todo-item')
    })

    it('contains a span', () => {
      expect(result.find('span')).to.have.length(1)
    })

    describe('span', () => {
      let span
      beforeEach(() => {
        span = result.find('span')
      })

      it('renders the title prop', () => {
        expect(span).to.have.text('title')
      })

      it('has the class "todo-title"', () => {
        expect(span).to.have.className('todo-title')
      })
    })

    it('contains a checkbox', () => {
      expect(result.find('input[type="checkbox"]')).to.have.length(1)
    })

    describe('checkbox', () => {
      let checkbox
      beforeEach(() => {
        checkbox = result.find('input[type="checkbox"]')
      })

      it('has the class "todo-complete-toggle"', () => {
        expect(checkbox).to.have.className('todo-complete-toggle')
      })

      describe('when isComplete prop is true', () => {
        beforeEach(() => {
          result.setProps({ isComplete: true })
          checkbox = result.find('input[type="checkbox"]')
        })

        it('sets the checked attribute to true', () => {
          expect(checkbox).to.be.checked()
        })
      })

      describe('when isComplete prop is false', () => {
        beforeEach(() => {
          result.setProps({ isComplete: false })
          checkbox = result.find('input[type="checkbox"]')
        })

        it('sets the checked attribute to false', () => {
          expect(checkbox).to.not.be.checked()
        })
      })

      describe('on change', () => {
        beforeEach(() => {
          checkbox.simulate('change')
        })

        it('calls the onToggleCompleteHandler prop', () => {
          expect(onToggleCompleteHandler).to.have.been.called
        })
      })
    })

    it('contains a button', () => {
      expect(result.find('button')).to.have.length(1)
    })

    describe('button', () => {
      let button
      beforeEach(() => {
        button = result.find('button')
      })

      it('has the text "remove"', () => {
        expect(button).to.have.text('remove')
      })

      it('has the class "todo-remove', () => {
        expect(button).to.have.className('todo-remove')
      })

      describe('on click', () => {
        beforeEach(() => {
          button.simulate('click')
        })

        it('calls the onDelete prop', () => {
          expect(onDeleteHandler).to.have.been.called
        })
      })
    })
  })
})
