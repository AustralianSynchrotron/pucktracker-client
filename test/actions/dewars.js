import {expect} from 'chai'
import * as actions from '../../src/actions/dewars'

describe('dewar actions', () => {

  it('setDewars should create a set dewars action', () => {
    expect(actions.setDewars([{name: '1001'}])).to.eql({
      type: 'SET_DEWARS',
      dewars: [{name: '1001'}]
    })
  })

})
