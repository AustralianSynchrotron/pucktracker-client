import { Map } from 'immutable'
import { expect } from 'chai'
import reducer from '../../src/reducers/app'

describe('app state reducer', () => {

  it('sets selected holder', () => {
    const initialState = Map()
    const action = {
      type: 'SET_SELECTED_HOLDER',
      holder: 'AS-01',
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(Map({
      selectedHolder: 'AS-01',
    }))
  })

  it('sets selected puck', () => {
    const initialState = Map()
    const action = {
      type: 'SET_SELECTED_PUCK',
      puck: 'ASP001',
    }
    const state = reducer(initialState, action)
    expect(state.get('selectedPuck')).to.equal('ASP001')
  })

})
