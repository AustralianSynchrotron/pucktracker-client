import {List, fromJS} from 'immutable'
import {expect} from 'chai'
import reducer from '../../src/reducers/pucks'

describe('pucks reducer', () => {

  it('sets pucks', () => {
    const initialState = List()
    const action = {
      type: 'SET_PUCKS',
      pucks: [{name: 'ASP001'}],
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {name: 'ASP001'},
    ]))
  })

  it('sets puck receptacle', () => {
    const initialState = fromJS([{name: 'ASP001', receptacle: '1001'}])
    const action = {
      type: 'SET_PUCK_RECEPTACLE',
      puck: 'ASP001',
      receptacleType: 'adaptor',
      receptacle: 'AS-01',
      slot: 'A',
      broadcast: true,
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {name: 'ASP001', receptacleType: 'adaptor', receptacle: 'AS-01', slot: 'A'},
    ]))
  })

})
