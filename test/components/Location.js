import React from 'react/addons'
import Location from '../../src/components/Location'
import {expect} from 'chai'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = React.addons.TestUtils

describe('Location', () => {

  it('displays the location name in the heading', () => {
    const component = renderIntoDocument(
      <Location location="MX1"/>
    )
    const heading = scryRenderedDOMComponentsWithTag(component, 'h1')[0]
    expect(heading.getDOMNode().textContent).to.equal('MX1')
  })

})
