import {expect} from 'chai'
import * as actions from '../../src/actions/adaptors'

describe('adaptor actions', () => {

  it('setAdaptors should create a set adaptors action', () => {
    expect(actions.setAdaptors({'AS-01': {}})).to.eql({
      type: 'SET_ADAPTORS',
      adaptors: {'AS-01': {}}
    })
  })

  it('addAdaptor should create an add adaptor action', () => {
    const action = actions.addAdaptor('AS-01')
    expect(action).to.eql({
      type: 'ADD_ADAPTOR',
      name: 'AS-01',
      data: {},
    })
  })

  it('move should create a move adaptor action', () => {
    const place = {location: 'MX1', position: 'Left'}
    const action = actions.setAdaptorPlace('AS-01', place)
    expect(action).to.eql({
      type: 'SET_ADAPTOR_PLACE',
      adaptor: 'AS-01',
      place: {location: 'MX1', position: 'Left'},
    })
  })

})
