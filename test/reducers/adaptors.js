import {Map, fromJS} from 'immutable'
import {expect} from 'chai'
import reducer from '../../src/reducers/adaptors'

describe('adaptors reducer', () => {

  it('adds adaptors', () => {
    const initialState = Map()
    const action = {
      type: 'ADD_ADAPTOR',
      name: 'AS-01',
      data: {},
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS({
      'AS-01': {}
    }))
  })

  it('sets adaptor place', () => {
    const initialState = fromJS({'AS-01': {}})
    const action = {
      type: 'SET_ADAPTOR_PLACE',
      name: 'AS-01',
      place: {
        dewar: '1',
      },
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS({
      'AS-01': {place: {dewar: '1'}},
    }))
  })

})
