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

})
