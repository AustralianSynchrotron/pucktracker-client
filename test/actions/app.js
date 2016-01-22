import {expect} from 'chai'
import * as actions from '../../src/actions/app'

describe('app actions', () => {

  it('setConnected should create an action with the connected status', () => {
    expect(actions.setConnected(true)).to.eql({
      type: 'SET_CONNECTED',
      connected: true,
    })
  })

  it('setDatabaseConnected should create an action', () => {
    expect(actions.setDatabaseConnected(true)).to.eql({
      type: 'SET_DATABASE_CONNECTED',
      connected: true,
    })
  })

  it('setSelectedHolder should create an action', () => {
    expect(actions.setSelectedHolder('AS-01')).to.eql({
      type: 'SET_SELECTED_HOLDER',
      holder: 'AS-01',
    })
  })

  it('setSelectedPuck should create an action', () => {
    expect(actions.setSelectedPuck('ASP001')).to.eql({
      type: 'SET_SELECTED_PUCK',
      puck: 'ASP001',
    })
  })

})
