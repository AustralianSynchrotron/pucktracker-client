import {expect} from 'chai'
import * as actions from '../../src/actions/pucks'

describe('puck actions', () => {

  it('setPucks should return an action to populate pucks', () => {
    expect(actions.setPucks([{name: 'ASP001'}])).to.eql({
      type: 'SET_PUCKS',
      pucks: [{name: 'ASP001'}]
    })
  })

})
