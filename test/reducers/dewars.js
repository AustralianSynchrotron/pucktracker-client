import {List, fromJS} from 'immutable'
import {expect} from 'chai'
import reducer from '../../src/reducers/dewars'

describe('dewars reducer', () => {

  it('sets dewars', () => {
    const initialState = List()
    const action = {
      type: 'SET_DEWARS',
      dewars: [{name: '1001'}]
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {name: '1001'}
    ]))
  })

})
