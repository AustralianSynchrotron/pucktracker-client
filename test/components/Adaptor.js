import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import { Map } from 'immutable'
import { expect } from 'chai'
import sinon from 'sinon'
import { Adaptor } from '../../src/components/Adaptor'

const {
  renderIntoDocument,
  Simulate,
} = ReactTestUtils

describe('Adaptor', () => {

  it('clear all pucks should call clearPucksForReceptacle', () => {
    const clearPucksForReceptacle = sinon.spy()
    const component = renderIntoDocument(
      <Adaptor pucks={Map()} ports={Map()}
               selectedReceptacle='AS-01'
               updatePuck={() => null}
               setSelectedPuck={() => null}
               setPuckReceptacle={() => null}
               setPortState={() => null}
               setMultiplePortStates={() => null}
               clearPucksForReceptacle={clearPucksForReceptacle}
      />
    )
    Simulate.click(findDOMNode(component.refs.clearAllPucks))
    expect(clearPucksForReceptacle).to.have.been.calledWith('AS-01', 'adaptor')
  })

})
