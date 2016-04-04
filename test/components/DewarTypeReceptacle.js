import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Map } from 'immutable'
import { DewarTypeReceptacle } from '../../src/components/DewarTypeReceptacle'
import { Dewar } from '../../src/reducers/dewars'

describe('DewarTypeReceptacle', () => {

  it('shows expectedContainers', () => {
    const location = {query: {leftDewar: 'd-123a-1'}}
    const dewars = Map({'d-123a-1': Dewar({expectedContainers: '101 | 102'})})
    const wrapper = shallow(
      <DewarTypeReceptacle side='left' location={location}
                           dewars={dewars} pucks={Map()} />
    )
    expect(wrapper).to.contain('101 | 102')
  })

  it("doesn't show puck section if selectedReceptacle is invalid", () => {
    const location = {query: {leftDewar: 'non-existent'}}
    const dewars = Map({'d-123a-1': Dewar()})
    const wrapper = shallow(
      <DewarTypeReceptacle side='left' location={location}
                           dewars={dewars} pucks={Map()} />
    )
    expect(wrapper).to.not.have.descendants('ListGroup')
  })

})
