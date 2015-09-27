import {List, fromJS} from 'immutable'
import {expect} from 'chai'
import reducer from '../../src/reducers/adaptors'

describe('adaptors reducer', () => {

  it('adds adaptors', () => {
    const initialState = List()
    const action = {
      type: 'ADD_ADAPTOR',
      adaptor: {name: 'AS-01'},
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {'name': 'AS-01'}
    ]))
  })

  it('sets adaptor place', () => {
    const initialState = fromJS([{name: 'AS-01'}])
    const action = {
      type: 'SET_ADAPTOR_PLACE',
      adaptor: 'AS-01',
      place: {
        location: 'MX1',
        position: 'Left',
      },
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {name: 'AS-01', place: {location: 'MX1', position: 'Left'}},
    ]))
  })

  it('sets adaptors', () => {
    const initialState = List()
    const action = {
      type: 'SET_ADAPTORS',
      adaptors: [
        {
          name: 'AS-01',
          place: { location: 'MX1', position: 'Left' },
        },
        {
          name: 'AS-02',
        }
      ]
    }
    const state = reducer(initialState, action)
    expect(state).to.equal(fromJS([
      {
        name: 'AS-01',
        place: { location: 'MX1', position: 'Left' },
      },
      {
        name: 'AS-02',
      }
    ]))
  })

})
