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

})
