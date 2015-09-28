import {expect} from 'chai'
import * as actions from '../../src/actions/pucks'

describe('puck actions', () => {

  it('setPucks should return an action to populate pucks', () => {
    expect(actions.setPucks([{name: 'ASP001'}])).to.eql({
      type: 'SET_PUCKS',
      pucks: [{name: 'ASP001'}]
    })
  })

  it('setPuckReceptacle should return an action to set the puck receptacle', () => {
    const action = actions.setPuckReceptacle('ASP001', 'adaptor', 'AS-01', 'A')
    expect(action).to.eql({
      type: 'SET_PUCK_RECEPTACLE',
      puck: 'ASP001',
      receptacleType: 'adaptor',
      receptacle: 'AS-01',
      slot: 'A',
      broadcast: true,
    })
  })

})
