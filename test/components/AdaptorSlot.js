import React, {findDOMNode} from 'react/addons'
import { Map } from 'immutable'
import { expect } from 'chai'
import { AdaptorSlot } from '../../src/components/AdaptorSlot'
import { Puck } from '../../src/reducers/pucks'

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = React.addons.TestUtils

describe('AdaptorSlot', () => {

  it('displays the name of the puck', () => {
    const puck = Puck({name: 'ASP001'})
    const component = renderIntoDocument(
      <AdaptorSlot puck={puck} ports={Map()} />
    )
    const button = scryRenderedDOMComponentsWithTag(component, 'input')[1]
    expect(findDOMNode(button).value).to.equal('ASP001')
  })

  it('displays a move target button when there is no puck', () => {
    const component = renderIntoDocument(
      <AdaptorSlot puck={undefined} ports={Map()} />
    )
    const button = scryRenderedDOMComponentsWithTag(component, 'input')[0]
    expect(findDOMNode(button).value).to.equal('Empty')
  })

})
