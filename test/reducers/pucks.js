import { Map } from 'immutable'
import {expect} from 'chai'
import reducer, { Puck } from '../../src/reducers/pucks'

describe('pucks reducer', () => {

  it('sets pucks', () => {
    const initialState = Map()
    const action = {
      type: 'SET_PUCKS',
      pucks: [{name: 'ASP001'}],
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['ASP001', 'name'])).to.equal('ASP001')
  })

  it('adds pucks', () => {
    const initialState = Map()
    const action = {
      type: 'ADD_PUCK',
      puck: {name: 'ASP001'},
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['ASP001', 'name'])).to.equal('ASP001')
  })

  it('sets puck receptacle', () => {
    const initialState = Map({'ASP001': Puck({receptacle: '1001'})})
    const action = {
      type: 'SET_PUCK_RECEPTACLE',
      puck: 'ASP001',
      receptacleType: 'adaptor',
      receptacle: 'AS-01',
      slot: 'A',
      broadcast: true,
    }
    const state = reducer(initialState, action)
    const puck = state.get('ASP001')
    expect(puck.receptacleType).to.equal('adaptor')
    expect(puck.receptacle).to.equal('AS-01')
    expect(puck.slot).to.equal('A')
  })

  it('updates pucks', () => {
    const initialState = Map({'ASP001': Puck({note: 'Nada'})})
    const action = {
      type: 'UPDATE_PUCK',
      puck: 'ASP001',
      update: {note: 'Test'},
    }
    const state = reducer(initialState, action)
    const puck = state.get('ASP001')
    expect(puck.note).to.equal('Test')
  })

})
