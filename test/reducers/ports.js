import {List, fromJS} from 'immutable'
import {expect} from 'chai'
import reducer from '../../src/reducers/ports'

describe('ports reducer', () => {

  it('sets ports', () => {
    const initialState = List()
    const action = {
      type: 'SET_PORTS',
      ports: [
        {containerType: 'puck', container: 'ASP001', number: 1, state: 'unknown'}
      ]
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {containerType: 'puck', container: 'ASP001', number: 1, state: 'unknown'}
    ]))
  })

})
