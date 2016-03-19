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

  it('returnDewar checkbox should be unchecked if returnDewar is false', () => {
    const dewar = Dewar({name: 'd-123a-1', returnDewar: false})
    const wrapper = mount(<DewarDetails dewar={dewar}/>)
    expect(wrapper.find('#returnDewar')).to.be.not.checked()
  })

  it('returnDewar checkbox should be checked if returnDewar is true', () => {
    const dewar = Dewar({name: 'd-123a-1', returnDewar: true})
    const wrapper = mount(<DewarDetails dewar={dewar}/>)
    expect(wrapper.find('#returnDewar')).to.be.checked()
  })

  it('clicking return dewar checkbox should emit an update', () => {
    const updateDewar = sinon.spy()
    const dewar = Dewar({name: 'd-123a-1'})
    const wrapper = mount(<DewarDetails dewar={dewar} updateDewar={updateDewar}/>)
    wrapper.find('#returnDewar').simulate('change', {target: {checked: true}})
    expect(updateDewar).to.have.been.calledWith('d-123a-1', {returnDewar: true})
  })

})
