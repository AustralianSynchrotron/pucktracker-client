import {expect} from 'chai'
import * as actions from '../../src/actions/pucks'

describe('puck actions', () => {

  it('setPucks should return an action to populate pucks', () => {
    expect(actions.setPucks([{name: 'ASP001'}])).to.eql({
      type: 'SET_PUCKS',
      pucks: [{name: 'ASP001'}]
    })
  })

  it('addPuck should return an action to add a puck', () => {
    expect(actions.addPuck({name: 'ASP001'})).to.eql({
      type: 'ADD_PUCK',
      puck: {name: 'ASP001'},
      broadcast: true,
    })
  })

  it('deletePuck should return an action to delete a puck', () => {
    expect(actions.deletePuck('ASP001')).to.eql({
      type: 'DELETE_PUCK',
      puck: 'ASP001',
      broadcast: true,
    })
  })

  it('setPuckReceptacle should return an action to set the puck receptacle', () => {
    const action = actions.setPuckReceptacle('ASP001', 'adaptor', 'AS-01', 'A')
    expect(action).to.eql({
      type: 'SET_PUCK_RECEPTACLE',
      puck: 'ASP001',
      receptacleType: 'adaptor',
      receptacle: 'AS-01',
      slot: 'A',
      broadcast: true,
    })
  })

  it('updatePuck should create an action to update pucks', () => {
    const action = actions.updatePuck('ASP001', {note: 'Test'})
    expect(action).to.eql({
      type: 'UPDATE_PUCK',
      puck: 'ASP001',
      update: {note: 'Test'},
      broadcast: true,
    })
  })

  it('clearPucksForReceptacle', () => {
    const action = actions.clearPucksForReceptacle('AS-01', 'adaptor')
    expect(action).to.eql({
      type: 'CLEAR_PUCKS_FOR_RECEPTACLE',
      receptacle: 'AS-01',
      receptacleType: 'adaptor',
      broadcast: true,
    })
  })

})
