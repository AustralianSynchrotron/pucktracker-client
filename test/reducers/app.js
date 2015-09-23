import {Map, fromJS} from 'immutable'
import {expect} from 'chai'
import reducer from '../../src/reducers/index'

describe('app state reducer', () => {

  it('sets selected holder', () => {
    const initialState = Map()
    const action = {
      type: 'SET_SELECTED_HOLDER',
      holder: 'AS-01',
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS({
      selectedHolder: 'AS-01',
    }))
  })

})
