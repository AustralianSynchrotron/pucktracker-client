import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import Location from '../../src/components/Location'
import {expect} from 'chai'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = ReactTestUtils

describe('Location', () => {

  it('displays the location name in the heading', () => {
    const component = renderIntoDocument(
      <Location holderLocation="MX1"/>
    )
    const heading = scryRenderedDOMComponentsWithTag(component, 'h1')[0]
    expect(heading.textContent).to.equal('MX1')
  })

})
