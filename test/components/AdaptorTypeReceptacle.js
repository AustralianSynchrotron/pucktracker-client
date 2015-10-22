import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import { Map } from 'immutable'
import { expect } from 'chai'
import { AdaptorTypeReceptacle } from '../../src/components/AdaptorTypeReceptacle'
import { Adaptor } from '../../src/reducers/adaptors'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = ReactTestUtils

describe('AdaptorTypeReceptacle', () => {

  it('should render the adaptor names in a select box', () => {
    const adaptors = Map({
      'AS-01': Adaptor({name: 'AS-01'}),
      'AS-02': Adaptor({name: 'AS-02'}),
    })
    const component = renderIntoDocument(
      <AdaptorTypeReceptacle adaptors={adaptors} location={{query: {}}}/>
    )
    const options = scryRenderedDOMComponentsWithTag(component, 'option')
    expect(options).to.have.length(3)
    expect(findDOMNode(options[0]).textContent).to.equal('')
    expect(findDOMNode(options[1]).textContent).to.equal('AS-01')
  })

})
