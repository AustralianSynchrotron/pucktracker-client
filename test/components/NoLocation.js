import React from 'react/addons'
import { fromJS } from 'immutable'
import { expect } from 'chai'
import { NoLocation } from '../../src/components/NoLocation'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} = React.addons.TestUtils


describe('NoLocation', () => {

  it('should display adaptors with no location', () => {
    const adaptors = fromJS([{name: 'AS-01'}])
    const component = renderIntoDocument(
      <NoLocation adaptors={adaptors}/>
    )
    const cells = scryRenderedDOMComponentsWithClass(component, 'holder')
    expect(cells).to.have.length(1)
  })

  it('should not display adaptors with a location', () => {
    const adaptors = fromJS([
      {name: 'AS-01', place: {location: 'MX1', position: 'Left'}},
    ])
    const component = renderIntoDocument(
      <NoLocation adaptors={adaptors}/>
    )
    const cells = scryRenderedDOMComponentsWithClass(component, 'holder')
    expect(cells).to.have.length(0)
  })

})
