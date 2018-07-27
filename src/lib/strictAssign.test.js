import { expect } from 'chai'

import strictAssign from './strictAssign'

describe('strictAssign', () => {
  const object1 = {
    a: 1,
    b: 'b',
    c: false,
    d: true
  }

  const object2 = {
    b: 'B',
    c: true,
    d: false,
    e: 'nope'
  }

  const object3 = {
    e: 'no',
    f: 1,
    b: 'BEE'
  }

  it('overwrites the objects, but does not add any extra keys not on the base object', () => {
    const result = strictAssign(object1, object2, object3)
    expect(result).to.deep.equal({
      a: 1,
      b: 'BEE',
      c: true,
      d: false
    })
  })
})
