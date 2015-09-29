import { Map } from 'immutable'
import { expect } from 'chai'
import reducer from '../../src/reducers/dewars'

describe('dewars reducer', () => {

  it('sets dewars', () => {
    const initialState = Map()
    const action = {
      type: 'SET_DEWARS',
      dewars: [{name: '1001'}]
    }
    const state = reducer(initialState, action)
    expect(state.size).to.equal(1)
    expect(state.getIn(['1001', 'name'])).to.equal('1001')
  })

})
