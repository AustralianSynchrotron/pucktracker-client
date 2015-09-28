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

  it('sets puck container', () => {
    const initialState = fromJS([{name: 'ASP001', container: '1001'}])
    const action = {
      type: 'SET_PUCK_CONTAINER',
      puck: 'ASP001',
      containerType: 'adaptor',
      container: 'AS-01',
      broadcast: true,
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {name: 'ASP001', containerType: 'adaptor', container: 'AS-01'},
    ]))
  })

})
