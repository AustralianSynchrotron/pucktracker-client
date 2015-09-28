import {expect} from 'chai'
import * as actions from '../../src/actions/pucks'

describe('puck actions', () => {

  it('setPucks should return an action to populate pucks', () => {
    expect(actions.setPucks([{name: 'ASP001'}])).to.eql({
      type: 'SET_PUCKS',
      pucks: [{name: 'ASP001'}]
    })
  })

  it('setPuckContainer should return an action to set the puck container', () => {
    const action = actions.setPuckContainer('ASP001', 'adaptor', 'AS-01')
    expect(action).to.eql({
      type: 'SET_PUCK_CONTAINER',
      puck: 'ASP001',
      containerType: 'adaptor',
      container: 'AS-01',
      broadcast: true,
    })
  })

})
