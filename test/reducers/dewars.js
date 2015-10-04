import { Map } from 'immutable'
import { expect } from 'chai'
import reducer, { Dewar } from '../../src/reducers/dewars'

describe('dewars reducer', () => {

  it('sets dewars', () => {
    const initialState = Map()
    const action = {
      type: 'SET_DEWARS',
      dewars: [{name: '1001'}]
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'name'])).to.equal('1001')
  })

  it('adds dewars', () => {
    const initialState = Map()
    const action = {
      type: 'ADD_DEWAR',
      dewar: {
        name: '1001',
      },
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'name'])).to.equal('1001')
  })

  it('updates dewars', () => {
    const initialState = Map({
      '1001': Dewar({name: '1001', epn: '123a'})
    })
    const action = {
      type: 'UPDATE_DEWAR',
      dewar: '1001',
      update: {epn: '456b'},
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'name'])).to.equal('1001')
    expect(state.getIn(['1001', 'epn'])).to.equal('456b')
  })

  it('sets dewars as offsite', () => {
    const initialState = Map({
      '1001': Dewar({onsite: true})
    })
    const action = {
      type: 'SET_DEWAR_OFFSITE',
      dewar: '1001',
    }
    const state = reducer(initialState, action)
    expect(state.getIn(['1001', 'onsite'])).to.equal(false)
  })

})
