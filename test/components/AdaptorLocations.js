import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import { Map } from 'immutable'
import { expect } from 'chai'
import { AdaptorLocations } from '../../src/components/AdaptorLocations'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = ReactTestUtils

describe('AdaptorLocations', () => {

  it('shows the possible locations', () => {
    const component = renderIntoDocument(
      <AdaptorLocations adaptors={Map()} />
    )
    const h1 = scryRenderedDOMComponentsWithTag(component, 'h1')[0]
    expect(findDOMNode(h1).textContent).to.contain('LS3000')
  })

})
