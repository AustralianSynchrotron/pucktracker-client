import { Map } from 'immutable'
import { expect } from 'chai'
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

  it('deletes pucks', () => {
    const initialState = Map({
      'ASP001': Puck()
    })
    const action = {
      type: 'DELETE_PUCK',
      puck: 'ASP001',
    }
    const state = reducer(initialState, action)
    expect(state.size).to.equal(0)
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

  it('sets puck receptacles to null when dewar is offsite', () => {

    const initialState = Map({
      'ASP001': Puck({receptacle: '1001'}),
      'ASP002': Puck({receptacle: '1002'}),
    })
    const action = {
      type: 'SET_DEWAR_OFFSITE',
      dewar: '1001',
    }
    const state = reducer(initialState, action)
    expect(state.get('ASP001').receptacle).to.equal(null)
    expect(state.get('ASP002').receptacle).to.equal('1002')

  })

  it('clears receptacle', () => {
    const initialState = Map({
      'ASP001': Puck({receptacle: 'AS-01', receptacleType: 'adaptor'}),
      'ASP002': Puck({receptacle: 'AS-02', receptacleType: 'adaptor'}),
    })
    const action = {
      type: 'CLEAR_PUCKS_FOR_RECEPTACLE',
      receptacle: 'AS-01',
      receptacleType: 'adaptor',
    }
    const state = reducer(initialState, action)
    expect(state.get('ASP001').receptacle).to.equal(null)
    expect(state.get('ASP001').receptacleType).to.equal(null)
    expect(state.get('ASP002').receptacle).to.equal('AS-02')
  })

})
