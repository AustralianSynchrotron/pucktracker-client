import React from 'react/addons'
import { Map } from 'immutable'
import { expect } from 'chai'
import { NoLocation } from '../../src/components/NoLocation'
import { Adaptor } from '../../src/reducers/adaptors'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} = React.addons.TestUtils


describe('NoLocation', () => {

  it('should display adaptors with no location', () => {
    const adaptors = Map({
      'AS-01': Adaptor({name: 'AS-01'}),
    })
    const component = renderIntoDocument(
      <NoLocation adaptors={adaptors}/>
    )
    const cells = scryRenderedDOMComponentsWithClass(component, 'holder')
    expect(cells).to.have.length(1)
  })

  it('should not display adaptors with a location', () => {
    const adaptors = Map({
      'AS-01': Adaptor({name: 'AS-01', location: 'MX1'}),
    })
    const component = renderIntoDocument(
      <NoLocation adaptors={adaptors}/>
    )
    const cells = scryRenderedDOMComponentsWithClass(component, 'holder')
    expect(cells).to.have.length(0)
  })

})
