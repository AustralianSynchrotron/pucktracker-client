import React from 'react'
import { expect } from 'chai'
import { render, mount } from 'enzyme'
import sinon from 'sinon'
import { DewarDetails } from '../../src/components/DewarDetails'
import { Dewar } from '../../src/reducers/dewars'

describe('DewarDetails', () => {

  it('returns "not found" if dewar is undefined', () => {
    const wrapper = render(<DewarDetails/>)
    expect(wrapper.text()).to.contain('not found')
  })

  it('shows the epn name', () => {
    const dewar = Dewar({name: 'd-123a-1', epn: '123a'})
    const wrapper = render(<DewarDetails dewar={dewar}/>)
    expect(wrapper.find('input')).to.have.value('123a')
  })

  it('changing the epn should emit an update', () => {
    const updateDewar = sinon.spy()
    const dewar = Dewar({name: 'd-123a-1', epn: '123a'})
    const wrapper = mount(<DewarDetails dewar={dewar} updateDewar={updateDewar}/>)
    wrapper.find('input').first().simulate('change', {target: {value: '456b'}})
    expect(updateDewar).to.have.been.calledWith('d-123a-1', {epn: '456b'})
  })

})
