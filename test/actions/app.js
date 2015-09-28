import {expect} from 'chai'
import * as actions from '../../src/actions/app'

describe('app actions', () => {

  it('setSelectedHolder should create an action', () => {
    expect(actions.setSelectedHolder('AS-01')).to.eql({
      type: 'SET_SELECTED_HOLDER',
      holder: 'AS-01',
    })
  })

  it('setSelectedReceptacle should create an action', () => {
    expect(actions.setSelectedReceptacle('left', 'adaptor', 'AS-01')).to.eql({
      type: 'SET_SELECTED_RECEPTACLE',
      side: 'left',
      receptacleType: 'adaptor',
      receptacleName: 'AS-01',
    })
  })

  it('setSelectedPuck should create an action', () => {
    expect(actions.setSelectedPuck('ASP001')).to.eql({
      type: 'SET_SELECTED_PUCK',
      puck: 'ASP001',
    })
  })

})
