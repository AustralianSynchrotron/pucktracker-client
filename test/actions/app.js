import {expect} from 'chai'
import * as actions from '../../src/actions/app'

describe('app actions', () => {

  it('setSelectedHolder should create an action', () => {
    expect(actions.setSelectedHolder('AS-01')).to.eql({
      type: 'SET_SELECTED_HOLDER',
      holder: 'AS-01',
    })
  })

})
