import { expect } from 'chai'
import sinon from 'sinon'
import * as actions from '../../src/actions/dewars'

describe('dewar actions', () => {

  it('setDewars should create a set dewars action', () => {
    expect(actions.setDewars([{name: 'd-123a-1'}])).to.eql({
      type: 'SET_DEWARS',
      dewars: [{name: 'd-123a-1'}]
    })
  })

  it('addDewar should create an action to add dewars', () => {
    const now = new Date()
    const action = actions.addDewar({name: 'd-123a-1', addedTime: now})
    expect(action).to.eql({
      type: 'ADD_DEWAR',
      dewar: {
        name: 'd-123a-1',
        addedTime: now,
      },
      broadcast: true,
    })
  })

  it('addDewar should assign a date if it is not given', () => {
    const now = new Date()
    sinon.useFakeTimers(now.getTime())
    const action = actions.addDewar({name: 'd-123a-1'})
    expect(action.dewar.addedTime).to.eql(now)
  })

  it('updateDewar should create an action to update the dewar', () => {
    expect(actions.updateDewar('d-123a-1', {epn: '123a'})).to.eql({
      type: 'UPDATE_DEWAR',
      dewar: 'd-123a-1',
      update: {epn: '123a'},
      broadcast: true,
    })
  })

  it('setDewarOffsite should create an action', () => {
    expect(actions.setDewarOffsite('d-123a-1')).to.eql({
      type: 'SET_DEWAR_OFFSITE',
      dewar: 'd-123a-1',
      broadcast: true,
    })
  })

  it('deleteDewar should create an action to delete the dewar', () => {
    expect(actions.deleteDewar('d-123a-1')).to.eql({
      type: 'DELETE_DEWAR',
      dewar: 'd-123a-1',
      broadcast: true,
    })
  })

  it('addDewar should assign a date if it is not given', () => {
    const now = new Date()
    sinon.useFakeTimers(now.getTime())
    expect(actions.setDewarFilled('d-123a-1')).to.eql({
      type: 'DEWAR_FILLED',
      dewar: 'd-123a-1',
      time: now,
      broadcast: true,
    })
  })

  describe('setDewarMissing', () =>  {

    it('should create an action set set dewars missing', () => {
      expect(actions.setDewarMissing('d-123a-1', true)).to.eql({
        type: 'UPDATE_DEWAR',
        dewar: 'd-123a-1',
        update: {missing: true},
        broadcast: true,
      })
    })

    it('should create an action set set dewars found', () => {
      expect(actions.setDewarMissing('d-123a-1', false)).to.eql({
        type: 'UPDATE_DEWAR',
        dewar: 'd-123a-1',
        update: {missing: false},
        broadcast: true,
      })
    })

  })

})
