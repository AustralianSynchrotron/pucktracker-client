import React from 'react/addons'
import { fromJS } from 'immutable'
import { expect } from 'chai'
import { NoLocation } from '../../src/components/NoLocation'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = React.addons.TestUtils


describe('NoLocation', () => {

  it('should display adaptors with no location', () => {
    const adaptors = fromJS({'AS-01': {place: null}})
    const component = renderIntoDocument(
      <NoLocation adaptors={adaptors}/>
    )
    const cells = scryRenderedDOMComponentsWithTag(component, 'td')
    expect(cells).to.have.length(1)
  })

  it('should not display adaptors with a location', () => {
    const adaptors = fromJS({
      'AS-01': {
        place: {location: 'MX1', position: 'Left'}
      }
    })
    const component = renderIntoDocument(
      <NoLocation adaptors={adaptors}/>
    )
    const cells = scryRenderedDOMComponentsWithTag(component, 'td')
    expect(cells).to.have.length(0)
  })

})
