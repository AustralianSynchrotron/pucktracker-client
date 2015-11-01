import {expect} from 'chai'
import * as actions from '../../src/actions/dewars'

describe('dewar actions', () => {

  it('setDewars should create a set dewars action', () => {
    expect(actions.setDewars([{name: '1001'}])).to.eql({
      type: 'SET_DEWARS',
      dewars: [{name: '1001'}]
    })
  })

  it('addDewar should create an action to add dewars', () => {
    expect(actions.addDewar({name: '1001'})).to.eql({
      type: 'ADD_DEWAR',
      dewar: {
        name: '1001',
      },
      broadcast: true,
    })
  })

  it('updateDewar should create an action to update the dewar', () => {
    expect(actions.updateDewar('1001', {epn: '123a'})).to.eql({
      type: 'UPDATE_DEWAR',
      dewar: '1001',
      update: {epn: '123a'},
      broadcast: true,
    })
  })

  it('setDewarOffsite should create an action', () => {
    expect(actions.setDewarOffsite('1001')).to.eql({
      type: 'SET_DEWAR_OFFSITE',
      dewar: '1001',
      broadcast: true,
    })
  })

  it('deleteDewar should create an action to delete the dewar', () => {
    expect(actions.deleteDewar('1001')).to.eql({
      type: 'DELETE_DEWAR',
      dewar: '1001',
      broadcast: true,
    })
  })

})
