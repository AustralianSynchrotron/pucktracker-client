import {expect} from 'chai'
import * as actions from '../../src/actions/ports'

describe('ports actions', () => {

  it('setPorts should return an action to populate ports', () => {
    const action = actions.setPorts([
      {containerType: 'puck', container: 'ASP001', number: 1, state: 'unknown'}
    ])
    expect(action).to.eql({
      type: 'SET_PORTS',
      ports: [
        {containerType: 'puck', container: 'ASP001', number: 1, state: 'unknown'}
      ]
    })
  })

  it('setPortState should return an action to set the port state', () => {
    const action = actions.setPortState('ASP001', 1, 'full')
    expect(action).to.eql({
      type: 'SET_PORT_STATE',
      container: 'ASP001',
      number: 1,
      state: 'full',
      broadcast: true,
    })
  })

  it('setMultiplePortStates should return an action', () => {
    const action = actions.setMultiplePortStates('ASP001', [1, 2, 3], 'full')
    expect(action).to.eql({
      type: 'SET_MULTIPLE_PORT_STATES',
      container: 'ASP001',
      numbers: [1, 2, 3],
      state: 'full',
      broadcast: true,
    })
  })

})
