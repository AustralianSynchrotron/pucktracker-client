import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import { Map } from 'immutable'
import { expect } from 'chai'
import { Beamline } from '../../src/components/Beamline'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = ReactTestUtils

describe('Beamline', () => {

  it('shows the three positions for beamlines', () => {
    const location = {pathname: 'mx1'}
    const component = renderIntoDocument(
      <Beamline location={location} adaptors={Map()}/>
    )
    const h1 = scryRenderedDOMComponentsWithTag(component, 'h1')[0]
    expect(findDOMNode(h1).textContent).to.contain('MX1')
    const h2s = scryRenderedDOMComponentsWithTag(component, 'h2')
    expect(findDOMNode(h2s[0]).textContent).to.contain('Left')
    expect(findDOMNode(h2s[1]).textContent).to.contain('Middle')
    expect(findDOMNode(h2s[2]).textContent).to.contain('Right')
  })


  it('shows the positions A-L for LS3000', () => {
    const location = {pathname: 'ls3000'}
    const component = renderIntoDocument(
      <Beamline location={location} adaptors={Map()}/>
    )
    const h2s = scryRenderedDOMComponentsWithTag(component, 'h2')
    expect(h2s).to.have.length(12)
    expect(findDOMNode(h2s[0]).textContent).to.contain('A')
  })

})
