import { Map } from 'immutable'
import { expect } from 'chai'
import reducer from '../../src/reducers/app'

describe('app state reducer', () => {

  it('sets connected status', () => {
    const initialState = Map()
    const action = { type: 'SET_CONNECTED', connected: true }
    const state = reducer(initialState, action)
    expect(state.get('connected')).to.equal(true)
  })

  it('sets the database connected status', () => {
    const initialState = Map()
    const action = { type: 'SET_DATABASE_CONNECTED', connected: true }
    const state = reducer(initialState, action)
    expect(state.get('databaseConnected')).to.equal(true)
  })

  it('sets selected holder', () => {
    const initialState = Map()
    const action = { type: 'SET_SELECTED_HOLDER', holder: 'AS-01' }
    const state = reducer(initialState, action)
    expect(state.get('selectedHolder')).to.equal('AS-01')
  })

  it('sets selected puck', () => {
    const initialState = Map()
    const action = { type: 'SET_SELECTED_PUCK', puck: 'ASP001' }
    const state = reducer(initialState, action)
    expect(state.get('selectedPuck')).to.equal('ASP001')
  })

})
