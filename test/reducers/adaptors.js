import { Map } from 'immutable'
import { expect } from 'chai'
import reducer, { Adaptor } from '../../src/reducers/adaptors'

describe('adaptors reducer', () => {

  it('sets adaptors', () => {
    const initialState = Map()
    const action = {
      type: 'SET_ADAPTORS',
      adaptors: [
        {name: 'AS-01', location: 'MX1', position: 'Left'},
        {name: 'AS-02'}
      ]
    }
    const state = reducer(initialState, action)
    expect(state.size).to.equal(2)
    expect(state.get('AS-01')).to.equal(
      new Adaptor({name: 'AS-01', location: 'MX1', position: 'Left'})
    )
    expect(state.getIn(['AS-02', 'name'])).to.equal('AS-02')
  })

  it('adds adaptors', () => {
    const initialState = Map()
    const action = {
      type: 'ADD_ADAPTOR',
      adaptor: {name: 'AS-01'},
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(Map({
      'AS-01': new Adaptor({name: 'AS-01'})
    }))
  })

  it('sets adaptor place', () => {
    const initialState = Map({'AS-01': new Adaptor()})
    const action = {
      type: 'SET_ADAPTOR_PLACE',
      adaptor: 'AS-01',
      location: 'MX1',
      position: 'Left',
    }
    const state = reducer(initialState, action)
    const adaptor = state.get('AS-01')
    expect(adaptor.location).to.equal('MX1')
    expect(adaptor.position).to.equal('Left')
  })


})
